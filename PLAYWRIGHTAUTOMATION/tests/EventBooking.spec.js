const {test,expect} = require('@playwright/test');
require('dotenv').config();
async function login(page) {
  const URL = process.env.BASE_URL;
  const email = process.env.TEST_EMAIL;
  const password = process.env.TEST_PASSWORD;
  const emailPlaceholder = "you@email.com";
  const passwordTag = page.locator("#password");
  const signInBtn = page.getByRole("button", { name: "Sign In" });

  await page.goto(URL);
  await page.getByPlaceholder(emailPlaceholder).fill(email);
  await passwordTag.fill(password);
  await signInBtn.click();
  await expect(page.getByText("Browse Events →")).toBeVisible();
}
async function futureDateValue() {
    const now = new Date();

    const futureDate = new Date(
        now.getTime() +
        (Math.floor(Math.random() * 30) + 1) * 24 * 60 * 60 * 1000
    );

    const year = futureDate.getFullYear();
    const month = String(futureDate.getMonth() + 1).padStart(2, "0");
    const day = String(futureDate.getDate()).padStart(2, "0");
    const hours = String(futureDate.getHours()).padStart(2, "0");
    const minutes = String(futureDate.getMinutes()).padStart(2, "0");

    const futureDateValue = `${year}-${month}-${day}T${hours}:${minutes}`;

    return futureDateValue;
}

async function createEvent(page) 
{
     const adminBtn = page.getByRole("button", { name: "Admin" });
       const addEventBtn = page.getByRole("button", { name: "+ Add Event" });
      const manageEvents=page.locator("[href='/admin/events']").first();
     const title= page.getByLabel("Title");
     const city= page.getByLabel("City");
     const venue=page.getByLabel("Venue");
     const dateTime=page.getByLabel("Event Date & Time");
     const price=page.getByLabel("Price");
     const seats=page.getByLabel("Total Seats");
     const description=page.getByPlaceholder("Describe the event…");
     const titleName="Test Event "+Date.now();
     const category=page.locator("#category");
    await adminBtn.click();
    await manageEvents.click();
    await title.fill(titleName);
    await category.selectOption("Sports");
    await city.fill("Chennai");
    await venue.fill("No:48,Cafe yolove Anna Nagar Chennai");
    await dateTime.fill(await futureDateValue());
    await price.fill("2000");
    await seats.fill("5");
    await addEventBtn.click();
    await expect(page.getByText("Event created!")).toBeVisible();
    return titleName;

}
async function bookEvent(page,titleName,noOfTickets)
{
   const eventPath=page.locator("#nav-events");
   const fullName=page.getByLabel("Full Name");
   const email=page.getByLabel("Email");
   const phoneNumberTag=page.getByLabel("Phone Number");
   const ticketsTag=page.getByRole("button",{name:"+"});
   const phoneNumber=process.env.TEST_PHONENUMBER;
   const name=process.env.TEST_USERNAME;
   const confirmBookingButton=page.getByRole("button",{name:"Confirm Booking"});
   const bookingRefTag=page.locator(".booking-ref");

  await eventPath.click();
  await page.locator("#event-card").first().waitFor();
  const title=page.locator("#event-card").filter({hasText:titleName});
  expect(await title).toBeVisible();
  const seatsBeforeBooking= await title.locator(".text-xs.font-bold.text-amber-600").textContent();
  await title.locator("#book-now-btn").click();
  await fullName.fill(name);
  await email.fill(process.env.TEST_EMAIL);
  await phoneNumberTag.fill(phoneNumber);
  for(let i=0;i<noOfTickets-1;i++)
  {
    await ticketsTag.click();
  }
 
  await confirmBookingButton.click();
  await expect(bookingRefTag).toBeVisible();
  const noOfTicketsBooked=await page.locator(".font-medium.text-gray-900").nth(2).textContent();
 const bookingRef=await bookingRefTag.textContent();
return {
        bookingRef: bookingRef.trim(),
        seatsBeforeBooking: seatsBeforeBooking.split(" ")[0],
        TicketsBooked:Number(noOfTicketsBooked)
    };
}
async function myBookings(page,bookingref,titleName)
{
     const myBookingsTag=page.locator("#nav-bookings");

     await myBookingsTag.click();
     await expect(page).toHaveURL(process.env.BASE_URL+"/bookings");
     const allBookings=page.locator(".space-y-4.mb-8");
     await expect(allBookings.first()).toBeVisible();
     await expect(allBookings.locator("#booking-card").filter({hasText:bookingref})).toBeVisible();
     await expect(allBookings.locator("#booking-card").filter({hasText:titleName})).toBeVisible();
}
async function refundEligibilityValidation(page,titleName,TicketsBooked)
{
     const allBookings=page.locator(".space-y-4.mb-8");
    const eligibilityRefundLink = page.locator("#check-refund-btn"); 
  await allBookings.locator("#booking-card").filter({hasText:titleName}).getByRole("button",{name:"View Details"}).click();
  await eligibilityRefundLink.click();
  if(TicketsBooked===1)
  {
   await expect(page.locator("#refund-result span")).toHaveText("Eligible for refund. Single-ticket bookings qualify for a full refund.");
  }
  else if (TicketsBooked>1){
   await expect(page.locator("#refund-result span")).toHaveText("Not eligible for refund. Group bookings ("+TicketsBooked+" tickets) are non-refundable.");
  }
  
}
async function validateSeatReduction(page, titleName, seatsBeforeBooking,TicketsBooked) {
 
    const eventPath = page.locator("#nav-events");

    await eventPath.click();
    
    const eventCard = page.locator("#event-card").filter({ hasText: titleName });

    await expect(eventCard).toBeVisible();
await page.reload();
    const expectedSeatCount = Number(seatsBeforeBooking) - TicketsBooked;

    if (expectedSeatCount === 0) {
        await expect(
            eventCard.locator(".text-xs.font-bold.text-red-600")
        ).toHaveText("SOLD OUT");
    } else {
        const seatsText = await eventCard
            .locator(".text-xs.font-bold.text-amber-600")
            .textContent();

        const actualSeatCount = Number(seatsText.trim().split(" ")[0]);

        await expect(actualSeatCount).toEqual(expectedSeatCount);
    }
}
test("Event Booking Validation",async ({page})=>
{  
  await login(page);
  const titleName = await createEvent(page);
  const noOfTickets=1;
  const { bookingRef, seatsBeforeBooking ,TicketsBooked} =await bookEvent(page, titleName,noOfTickets);
  await myBookings(page,bookingRef,titleName);
  await validateSeatReduction(page,titleName,seatsBeforeBooking,TicketsBooked)

})

test("Single ticket booking is eligible for refund-Validation ",async ({page})=>
{  
  await login(page);
  const titleName = await createEvent(page);
  const noOfTickets=1;
  const {bookingRef, seatsBeforeBooking ,TicketsBooked} =await bookEvent(page, titleName,noOfTickets);
  await myBookings(page,bookingRef,titleName);
  await refundEligibilityValidation(page,titleName,TicketsBooked);
})
test("Multiple ticket booking is not eligible for refund-Validation ",async ({page})=>
{  
  await login(page);
  const titleName = await createEvent(page);
  const noOfTickets=2;
  const {bookingRef, seatsBeforeBooking ,TicketsBooked} =await bookEvent(page, titleName,noOfTickets);
  await myBookings(page,bookingRef,titleName);
  await refundEligibilityValidation(page,titleName,TicketsBooked);
})

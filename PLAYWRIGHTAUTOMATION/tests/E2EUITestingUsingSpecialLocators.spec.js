const {test,expect} = require('@playwright/test');

test ('END TO END UI TESTING',async({page})=>

    {
const userEmail=page.getByPlaceholder("email@example.com");
const userPassword =page.getByPlaceholder("enter your passsword");
const login =page.getByText("Login");
const productName="ZARA COAT 3";
const expectedConfirmationMessage=" Thankyou for the order. ";
const checkoutButton=page.getByRole("button",{name:'Checkout'});
const addedElement=page.getByText("ZARA COAT 3");
const site="https://rahulshettyacademy.com/client/#/auth/login";
const couponButton =page.getByRole("button",{name:'Apply Coupon'});
const selectCountry=page.getByPlaceholder("Select Country");
const orderIdTag=page.locator(".em-spacer-1 .ng-star-inserted");
const cvvInput = page
    .locator('div.field.small')
    .filter({ hasText: 'CVV Code'})
    .locator('input');
const nameOnTheCard = page
    .locator('div.field')
    .filter({ hasText: 'Name on Card '})
    .locator('input');
const applyCoupon = page
    .locator('div.field.small')
    .filter({ hasText: 'Apply Coupon '})
    .locator('input');
const placeorderButton=await page.getByText("PLACE ORDER");
const orderConfirmationTag=page.locator(".hero-primary");
const ordersButton=page.getByRole("button",{name:'  ORDERS'});

await page.goto(site);
await userEmail.fill("keerthanakannan872@gmail.com");
await userPassword.fill("3bYr5ZpMK@wT7@t");
await login.click();
await page.waitForLoadState("networkidle");
await page.locator(".card-body").filter({hasText:'ZARA COAT 3'}).getByRole("button",{name:'Add To Cart'}).click();
await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();

await page.waitForLoadState("networkidle");
await page.locator("div li").first().waitFor();
await expect(addedElement).toBeVisible();
await checkoutButton.click();
await cvvInput.fill("123");
await nameOnTheCard.fill("Keerthana");
await applyCoupon.fill("ELSUOU");
expect(await page.getByText("keerthanakannan872@gmail.com")).toBeVisible();
  await page.getByPlaceholder("Select Country").pressSequentially("ind");
 
   await page.getByRole("button",{name :"India"}).nth(1).click();
   await page.getByText("PLACE ORDER").click();

await expect(page.getByText(expectedConfirmationMessage)).toBeVisible();

const text = await orderIdTag.textContent();
const orderID = text.split("|")[1].trim();
await console.log("ORDERID:",orderID);
await ordersButton.click();

await page.locator("tbody tr").first().waitFor();
await page.locator("tbody tr").filter({hasText:orderID}).getByRole("button",{name:"View"}).click();

await expect(page.getByText(orderID)).toBeVisible();
await console.log("OrderIdInViewPage : "+orderID);
    }
);

test.only('Handling Calenders',async({page})=>
{
    const month="july";
    const date=10;
    const year =2023;  
    const ExpectedDate="2023-07-10";
  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
  await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
     await page.locator(".react-calendar__navigation__label").click();
     await page.getByRole("button",{name: year}).click();
      await page.getByRole("button",{name: month}).click();
       await page.locator("//abbr[text()='"+date+"']").click();
        expect(await page.locator("[name='date']").inputValue()).toEqual(ExpectedDate);
 
})
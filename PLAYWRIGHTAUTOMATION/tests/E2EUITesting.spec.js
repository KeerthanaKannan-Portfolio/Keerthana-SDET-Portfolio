const {test,expect} = require('@playwright/test');

test ('END TO END UI TESTING',async({page})=>
    {
const userEmail=page.locator("#userEmail")
const userPassword =page.locator("#userPassword");
const login =page.locator("#login");
const addToCartButton=page.locator("[routerlink='/dashboard/cart']");
const productName="ZARA COAT 3";
const expectedConfirmationMessage=" Thankyou for the order. ";
const checkoutButton=page.locator("text=Checkout");
const addedElement=page.locator("h3:has-text('ZARA COAT 3')")
const site="https://rahulshettyacademy.com/client/#/auth/login";
const couponButton =page.locator("[type='submit']");
const selectCountry=page.locator("[placeholder='Select Country']");
const orderIdTag=page.locator(".em-spacer-1 .ng-star-inserted");
const cvvInput = page
    .locator('div.field.small')
    .filter({ hasText: 'CVV Code' })
    .locator('input');
const nameOnTheCard = page
    .locator('div.field')
    .filter({ hasText: 'Name on Card ' })
    .locator('input');
const applyCoupon = page
    .locator('div.field.small')
    .filter({ hasText: 'Apply Coupon ' })
    .locator('input');
const placeorderButton=page.locator(".btnn.action__submit");
const orderConfirmationTag=page.locator(".hero-primary");
const ordersButton=page.locator("[routerlink='/dashboard/myorders']");

await page.goto(site);
await userEmail.fill("keerthanakannan872@gmail.com");
await userPassword.fill("3bYr5ZpMK@wT7@t");
await login.click();
await page.waitForLoadState("networkidle");
//await page.locator(".card-body b").first().waitFor();
const elements=await page.locator(".card-body");

for(let i=0;i< await elements.count();i++)
{
    const prdName=await elements.nth(i).locator("b").textContent();
    if(productName===prdName)
    {
     await elements.nth(i).locator("text= Add To Cart").click();
     break;
    }
}
await addToCartButton.click();
await page.waitForLoadState("networkidle");
await page.locator(".cart").waitFor();
await expect(addedElement).toBeVisible();
await checkoutButton.click();
await cvvInput.fill("123");
await nameOnTheCard.fill("Keerthana");
await applyCoupon.fill("ELSUOU");
//await couponButton.click();
expect(await page.locator(".user__name.mt-5 label")).toHaveText("keerthanakannan872@gmail.com");
await selectCountry.pressSequentially("India");

const dropDownOptions = page.locator(".ta-results.list-group.ng-star-inserted");
await dropDownOptions.waitFor();

for(let i=0;i<await dropDownOptions.locator("button").count();i++)
{
 const options=await dropDownOptions.locator("button").nth(i).textContent();
    if(options===" India")
    {
     await dropDownOptions.locator("button").nth(i).click();
     break;
    }
}
await placeorderButton.click();
await expect(orderConfirmationTag).toHaveText(expectedConfirmationMessage);

const id=await orderIdTag.textContent();
const orderID=await id.split("|")[1].trim();
await console.log("ORDERID:",orderID);
await ordersButton.first().click();

const rows = page.locator("table.table-bordered.table-hover.ng-star-inserted tbody th");
await rows.first().waitFor();
const rowCount = await rows.count();

for(let i=0;i<rowCount;i++)
{
     if(await rows.nth(i).first().textContent()===orderID);
     {
        await page.locator("table.table-bordered.table-hover.ng-star-inserted tbody tr").nth(i).locator(".btn.btn-primary").click();
        break;
     }
}
const orderIdInViewPageTag =page.locator(".col-text.-main");
const orderIdInViewPage=await orderIdInViewPageTag.textContent();
await expect(orderIdInViewPage).toEqual(orderID);
await console.log("OrderIdInViewPage : "+orderIdInViewPage);
    }
);
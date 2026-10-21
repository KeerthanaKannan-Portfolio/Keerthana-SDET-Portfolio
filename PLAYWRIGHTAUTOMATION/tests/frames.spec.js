const {test,expect}= require('@playwright/test');
require('dotenv').config();

test("ElementIsVisible",async({page})=>
{
   await page.goto(process.env.AUTOMATIOPRACTICESITE);
  const framePage= page.frameLocator("#courses-iframe");
  const coursesTag=framePage.locator("[href=\"https://courses.rahulshettyacademy.com/courses\"]:visible");
 
  await coursesTag.first().click();
  await expect(framePage.locator(".BrowseProductsTitle")).toHaveText("Browse products");
}
)
const {test,expect}= require('@playwright/test');
require('dotenv').config();

test("ElementIsVisible",async({page})=>
{
   await page.goto(process.env.AUTOMATIOPRACTICESITE);
const confirmBtn=page.locator("#confirmbtn");
await confirmBtn.click();
await page.on('dialog',dialog=>dialog.accept());
await confirmBtn.click();
await page.on('dialog',dialog=>dialog.dismiss());
const hoverBtn=page.locator("#mousehover");
await hoverBtn.hover();
const topButtonTag=page.locator("[href=\"#top\"]");
await topButtonTag.click();
}
)
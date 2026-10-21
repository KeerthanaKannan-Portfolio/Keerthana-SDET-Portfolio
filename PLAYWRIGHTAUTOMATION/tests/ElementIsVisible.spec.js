const {test,expect}= require('@playwright/test');
require('dotenv').config();
test("ElementIsVisible",async({page})=>
{
   await page.goto(process.env.AUTOMATIOPRACTICESITE);
  
   const hideShowExampleBoxTag=page.locator("#displayed-text");
   const hideButton=page.locator("#hide-textbox");
   await expect(hideShowExampleBoxTag).toBeVisible();
   await hideButton.click();
   await expect(hideShowExampleBoxTag).toBeHidden();
}
)
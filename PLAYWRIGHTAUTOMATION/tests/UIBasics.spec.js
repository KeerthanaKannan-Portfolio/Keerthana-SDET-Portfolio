const {test,expect} = require('@playwright/test');

   
test('Opening new brower instance', async ({browser})=> 
   
    {
  const context = await browser.newContext();
  const page =await context.newPage();
  await page.goto("https://avm-institute.lovable.app/");

});



test('Opening new brower instance only using page fixer', async ({page})=> 
{
   const userName=page.locator('#username');
   const password =page.locator('#password');
   const terms =page.locator('#terms');
   const signInBtn=page.locator('#signInBtn');
   const ErrorBlock=page.locator("[style*='block']");
   const firstElementLocator=page.locator(".card-body a");
   const userRadioButton=page.locator(".radiotextsty");
   const okayButton=page.locator("#okayBtn");
   const dropdown=page.locator("select.form-control");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

  await userName.fill("rahulshetty");
  await password.fill("Learning");
  await terms.click();
  await signInBtn.click();

  console.log(await ErrorBlock.textContent());
  await expect(ErrorBlock).toHaveText("Incorrect username/password.");
await expect(ErrorBlock).toContainText("Incorrect");

   await userName.fill("");
   await userName.fill("rahulshettyacademy");
   await password.fill("");
   await password.fill("Learning@830$3mK2");
   await signInBtn.click();

   const firstElement = await firstElementLocator.first().textContent();
   const secondElement =await firstElementLocator.nth(1).textContent();
   const allElements =await firstElementLocator.allTextContents();
   console.log(firstElement);
   console.log(secondElement);
   console.log(allElements);

});

test('EcommerceSite',async({page})=>
{
 const userEmail=page.locator("#userEmail")
 const userPassword =page.locator("#userPassword");
 const login =page.locator("#login");
const elements=page.locator(".card-body b");

const site="https://rahulshettyacademy.com/client/#/auth/login";
await page.goto(site);
await userEmail.fill("keerthanakannan872@gmail.com");
await userPassword.fill("3bYr5ZpMK@wT7@t");
await login.click();

const firstElement= await elements.first().textContent();
console.log("First Element in the Page :" , firstElement);
await page.waitForLoadState("networkidle");
//await elements.first().waitFor();
const allElements =await elements.allTextContents();
console.log(allElements);
})

test('UI Controls',async ({page})=>
{
   const userName=page.locator('#username');
   const password =page.locator('#password');
   const terms =page.locator('#terms');
   const signInBtn=page.locator('#signInBtn');
   const ErrorBlock=page.locator("[style*='block']");
   const firstElementLocator=page.locator(".card-body a");
   const userRadioButton=page.locator(".radiotextsty");
   const okayButton=page.locator("#okayBtn");
   const dropdown=page.locator("select.form-control");
   const floatingText1=page.locator("[href='https://rahulshettyacademy.com/documents-request']");
const floatingText2=page.locator("[href='https://techsmarthire.com/']");

   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   await expect (floatingText1).toHaveAttribute('class','blinkingText');
   await expect (floatingText2).toHaveAttribute('class','blinkingText');

    await floatingText1.click();

   await userName.fill("");
   await userName.fill("rahulshettyacademy");
   await password.fill("");
   await password.fill("Learning@830$3mK2");
   await userRadioButton.last().click();
   await okayButton.click();
   await expect( userRadioButton.last()).toBeChecked();
   console.log("is RadioButton Checked:",await userRadioButton.last().isChecked());
   await dropdown.selectOption("consult");

   await terms.click();
   await expect(terms).toBeChecked();
   console.log("is CheckBox checked:",await userRadioButton.last().isChecked());
   await terms.uncheck();
   expect(await terms.isChecked()).toBeFalsy();
   console.log("is CheckBox not checked:",await userRadioButton.last().isChecked());
   await terms.check();
   //await page.pause();
   await signInBtn.click();
}
)

test("handling child page",async ({browser})=>
{
 
   const context = await browser.newContext();
   const page =await context.newPage(); 
   const userName=page.locator('#username');
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   const floatingText1=page.locator("[href='https://rahulshettyacademy.com/documents-request']");
   const [newPage]= await Promise.all(
    [
        context.waitForEvent('page'),
        floatingText1.click()
    ]
  
)
  const text=await newPage.locator(".red").textContent();
console.log(text);

const splitText=text.split("@");
const domainName=splitText[1].split(" ")[0];
console.log(domainName);
await userName.fill("");

await userName.fill(domainName);
//await page.pause();
})

test.only("Playwright special locators",async ({page})=>
{
  const nameTag=page.locator("[name='name']");
  const emailTag=page.locator("[name='email']");
  const name="Keerthana";
  const eamil="keerthana123@gmail.com";
  const password="12nefhe";
  const URL="https://rahulshettyacademy.com/angularpractice/";
  const labelCheckBox="Check me out if you Love IceCreams!";
  const labelRadioButton="Employed";
  const genderLabel="Gender";
  const successMessageText=page.getByText("Success!");
  await page.goto(URL);
  await nameTag.first().fill(name);
  await emailTag.fill("");
  await emailTag.fill(eamil);
  await page.getByPlaceholder("Password").fill(password);
  await page.getByLabel(genderLabel).selectOption("Female");
  await page.getByLabel(labelCheckBox).check();
  await page.getByLabel(labelRadioButton).check();
  await page.getByRole("button",{name:'Submit'}).click();
  await expect(successMessageText).toBeVisible();
  await page.getByRole("link",{name:'shop'}).click();
  await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button").click();
   await page.pause();
}
)
;
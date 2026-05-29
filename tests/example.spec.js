// @ts-check
import { test, expect } from '@playwright/test';

test.describe('login page',()=>{
  test('should have correct meta data',async({page})=>{
    await page.goto('http://localhost:5173/')
    await expect(page).toHaveTitle('frontend')
  })

  test("user button should be active by default",async({page})=>{

    await page.goto('http://localhost:5173/login');

    await expect(
      page.getByText('Login Page !!!')
    ).toBeVisible();

    const userBtn = page.getByRole('button',{name:'user'});

    await expect(userBtn).toBeVisible();
  })

  test('should switch to admin login page',async({page})=>{
    await page.goto('http://localhost:5173/login')

    await page.getByRole('button',{name:'admin'}).click()

    await expect(
      page.getByText('Admin Login Page')
    ).toBeVisible()
  })


  test('should switch back tot user login page',async({page})=>{
    await page.goto("http://localhost:5173/login")

    await page.getByRole('button',{name:"admin"}).click();

    await page.getByRole('button',{name:'user'}).click();

    await expect(
      page.getByText('Login Page !!!')
    ).toBeVisible()
  })
})

test.describe('Login input feilds',()=>{
  test('email and passord inputs should be visible',async({page})=>{
    await page.goto('http://localhost:5173/login');

    const emailInput = page.getByPlaceholder('vishnu@gmail.com');

    await emailInput.fill('admin@gmail.com');

    await expect(emailInput).toHaveValue('admin@gmail.com')
  })

  test('should type password',async({page})=>{
    await page.goto('http://localhost:5173/login')
    const passwordInput = page.getByPlaceholder('* * * * * * *')

    await passwordInput.fill('123456');

    await expect(passwordInput).toHaveValue('123456')
  })

  test('login input feilds',async({page})=>{
    await page.goto('http://localhost:5173/login')

   const emailLabel = page.getByLabel("Email :")

   const passwordLabel = page.getByLabel("Password :")

   await expect(emailLabel).toBeVisible();
   await expect(passwordLabel).toBeVisible();

  })
})


test.describe('registration page', () => {

  test.beforeEach(async ({ page }) => {

    await page.goto('http://localhost:5173/register');

  });


  test('should show registration heading', async ({ page }) => {

    await expect(
      page.getByText('USER REGISTRATION')
    ).toBeVisible();

  });


  test('all input fields should be visible', async ({ page }) => {

    await expect(
      page.getByPlaceholder('vishnu krishna')
    ).toBeVisible();

    await expect(
      page.getByPlaceholder('vishnu@gmail.com')
    ).toBeVisible();

    await expect(
      page.getByPlaceholder(' 8148929450')
    ).toBeVisible();

    await expect(
      page.getByPlaceholder('* * * * * *').first()
    ).toBeVisible();

  });


  test('should type into registration form', async ({ page }) => {

    await page
      .getByPlaceholder('vishnu krishna')
      .fill('vishnu krishna');

    await page
      .getByPlaceholder('vishnu@gmail.com')
      .fill('vishnu@gmail.com');

    await page
      .getByPlaceholder(' 8148929450')
      .fill('8148929450');

    await page
      .getByPlaceholder('* * * * * *')
      .first()
      .fill('123456');

    await expect(
      page.getByPlaceholder('vishnu krishna')
    ).toHaveValue('vishnu krishna');

  });


  test('register button should be disabled for invalid form', async ({ page }) => {

    const registerBtn =
      page.getByRole('button', { name: 'Register' });

    await expect(registerBtn).toBeDisabled();

  });


  test('register button should be enabled for valid form', async ({ page }) => {

    await page
      .getByPlaceholder('vishnu krishna')
      .fill('Vishnu Krishna');

    await page
      .getByPlaceholder('vishnu@gmail.com')
      .fill('vishnu@gmail.com');

    await page
      .getByPlaceholder(' 8148929450')
      .fill('8148929450');

    await page
      .getByPlaceholder('* * * * * *')
      .first()
      .fill('123456');

    const registerBtn =
      page.getByRole('button', { name: 'Register' });

    await expect(registerBtn).toBeEnabled();

  });

});
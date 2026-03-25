import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { LogoutPage } from '../pages/logout';
import testData from '../testData/test.json';

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Swag Labs');
});

test('login with valid credentials', async ({ page }) => {
  await page.goto('/');
  const loginPage = new LoginPage(page);
  const logoutPage = new LogoutPage(page);
  await loginPage.login(testData.Valid_Username, testData.Valid_Password);
  await expect(page).toHaveURL('/inventory.html');

  await logoutPage.logout();
  await expect(page).toHaveURL('/');
});

test('login with invalid credentials', async ({ page }) => {
  await page.goto('/');
  const loginPage = new LoginPage(page);
  await loginPage.login(testData.Invalid_Username, testData.Invalid_Password);
  await expect(page.locator('.error-message-container')).toHaveText('Epic sadface: Username and password do not match any user in this service');
});

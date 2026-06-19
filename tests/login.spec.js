import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { LogoutPage } from '../pages/logout';
import testData from '../testData/test.json';
import { logger } from '../utils/logger';

test('has title', async ({ page }) => {
  logger.info('Testing page title');
  await page.goto('/');
  await expect(page).toHaveTitle('Swag Labs');
  logger.info('Page title test completed successfully');
  await page.screenshot({ path: 'screenshots/login_page.png' });
});

test('login and logout with valid credentials', async ({ page }) => {
  logger.info('Testing login and logout with valid credentials');
  await page.goto('/');
  const loginPage = new LoginPage(page);
  const logoutPage = new LogoutPage(page);
  await loginPage.login(testData.Valid_Username, testData.Valid_Password);
  await expect(page).toHaveURL('/inventory.html');
  logger.info('Login with valid credentials test completed successfully');
  await page.screenshot({ path: 'screenshots/login_success.png' });
  await logoutPage.logout();
  await expect(page).toHaveURL('/');
  logger.info('Logout completed successfully');
  await page.screenshot({ path: 'screenshots/logout_success.png' });
});




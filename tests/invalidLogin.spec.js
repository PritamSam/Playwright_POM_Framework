import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';
import testData from '../testData/test.json';
import { logger } from '../utils/logger';
import { errorMessage } from '../data/messages/errorMessage';

test('login with invalid credentials', async ({ page }) => {
  logger.info('Testing login with invalid credentials');
  await page.goto('/');
  const loginPage = new LoginPage(page);
  await loginPage.login(testData.Invalid_Username,testData.Invalid_Password);
  await expect(page.locator('.error-message-container')).toHaveText(errorMessage.invalidCredentials);
  logger.info('Login with invalid credentials test completed successfully');
  await page.screenshot({ path: 'screenshots/invalid_login.png' });
});
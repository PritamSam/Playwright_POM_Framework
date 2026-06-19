import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/cart';
import { logger } from '../utils/logger';
import { sideMenuValidation } from '../data/messages/sideMenuValidation';
import { orderSuccessValidation } from '../data/messages/orderSuccessValidation';
import testData from '../testData/test.json';
import { LoginPage } from '../pages/login';
import { LogoutPage } from '../pages/logout';
import { loginUtil } from '../utils/loginHelper';

let context;
let page;

test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    const loginPage = new LoginPage(page);
    await loginUtil(page, testData.Valid_Username, testData.Valid_Password);
});

test.afterAll(async () => {
    const logoutPage = new LogoutPage(page);
    await logoutPage.logout();
    await context.close();
});

test('open and close side menu', async () => {
    logger.info('Testing side menu functionality');
    const cartPage = new CartPage(page);
    await cartPage.openSideMenu();
    const contents = await cartPage.grabSideMenuContents();
    await page.screenshot({ path: 'screenshots/side_menu_opened.png' });
    expect(contents).toEqual(sideMenuValidation);
    await cartPage.closeSideMenu();
    await expect(page).toHaveURL('/inventory.html');
    logger.info('Side menu test completed successfully');
    await page.screenshot({ path: 'screenshots/side_menu_test.png' });
});

test('add product to cart and checkout', async () => {
    logger.info('Testing add product to cart and checkout functionality');
    const cartPage = new CartPage(page);
    await page.goto('/inventory.html');
    await cartPage.addProductToCart();
    await cartPage.goToCart();
    await page.screenshot({ path: 'screenshots/cart_page.png' });
    await expect(page).toHaveURL('/cart.html');
    await cartPage.checkout(testData.FirstName, testData.LastName, testData.ZipCode);
    await expect(page).toHaveURL('/checkout-step-two.html');
    await cartPage.finishCheckout();
    await expect(page).toHaveURL('/checkout-complete.html');
    const successMessage = await cartPage.getSuccessMessage();
    expect(successMessage).toBe(orderSuccessValidation.orderConfirmationMessage);
    await page.screenshot({ path: 'screenshots/checkout_test.png' });
    await cartPage.backToHome();
    await expect(page).toHaveURL('/inventory.html');
    logger.info('Add product to cart and checkout test completed successfully');
});
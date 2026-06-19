const { LoginPage } = require("../pages/login")

async function loginUtil(page, username, password) {
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.usernameInput.fill(username);
    await loginPage.passwordInput.fill(password);
    await loginPage.loginButton.click();
}

module.exports = {loginUtil}
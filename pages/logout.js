class LogoutPage {
  constructor(page) {
    this.page = page;
    this.sidebarButton = page.locator('//*[text()="Open Menu"]')
    this.logoutButton = page.getByText('Logout');
  }

  async logout() {
    await this.sidebarButton.click();
    await this.logoutButton.click();
  }
}

module.exports = { LogoutPage };

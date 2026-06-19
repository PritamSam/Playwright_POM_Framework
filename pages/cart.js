class CartPage{
    constructor(page){
        this.page = page;
        this.sideMenuButton = page.getByRole('button', { name: 'Open Menu' });
        this.sideMenuContents = page.locator('//nav[@class="bm-item-list"]/a')
        this.closeMenu = page.getByRole('button', { name: 'Close Menu' })
        this.addProduct = page.locator('//div[@class="inventory_item"][2]//button[text()="Add to cart"]');
        this.cartButton = page.locator('//a[@class="shopping_cart_link"]');
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');
        this.continueButton = page.locator("#continue");
        this.finishButton = page.getByRole('button', { name: 'Finish' })
        this.successMessage = page.locator('//h2');
        this.backHomeButton  = page.getByRole('button', { name: 'Back Home' });
    }

    async openSideMenu(){
        await this.sideMenuButton.click();
    }

    async grabSideMenuContents(){
        const contents = await this.sideMenuContents.allTextContents();
        return contents;
    }

    async closeSideMenu(){
        await this.closeMenu.click();
    }

    async addProductToCart(){
        await this.addProduct.click();
    }

    async goToCart(){
        await this.cartButton.click();
    }

    async checkout(firstName, lastName, postalCode){
        await this.checkoutButton.click();
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
        await this.continueButton.click();
    }

    async finishCheckout(){
        await this.finishButton.click();
    }

    async getSuccessMessage(){
        const message = await this.successMessage.textContent();
        return message;
    }

    async backToHome(){
        await this.backHomeButton.click();
    }
}

module.exports = { CartPage };
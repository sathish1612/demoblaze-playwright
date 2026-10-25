import {Page, Locator} from '@playwright/test';

export class ProductPage {
    readonly page: Page
    readonly productName: Locator
    readonly addToCartButton: Locator

    constructor(page: Page) {
        this.page = page;
        this.productName = page.locator('.name');
        this.addToCartButton = page.getByRole('link', {name: 'Add to cart'});
    }

    async addToCart(): Promise<string> {
        const dialogPromise = this.page.waitForEvent('dialog');
        await this.addToCartButton.click();
        const dialog = await dialogPromise;
        const message = dialog.message();
        await dialog.accept();
        return message;
    }

}

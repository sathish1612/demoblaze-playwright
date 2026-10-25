import {Page, Locator, expect} from '@playwright/test';

export class HomePage {
    readonly page: Page
    readonly cartLink: Locator
    readonly logoutLink: Locator
    readonly welcomeUser: Locator

    constructor(page: Page) {
        this.page = page;
        this.cartLink = page.locator('#cartur');
                this.welcomeUser = page.locator('#nameofuser');
        this.logoutLink = page.locator('#logout2');
    }

    async openProduct(productName: string) {
        await this.page.getByRole('link', {name: productName, exact: true}).click();
    }

    async openCart() {
        const responsePromise = this.page.waitForResponse('**/viewcart');
        await this.cartLink.click();
        const cart = await (await responsePromise).json();
        await expect(this.page.locator('#tbodyid tr')).toHaveCount(cart.Items.length);
    }

}

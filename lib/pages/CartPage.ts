import {Page, Locator, expect} from '@playwright/test';

export class CartPage {
    readonly page: Page
    readonly rows: Locator
    readonly placeOrderButton: Locator

    constructor(page: Page) {
        this.page = page;
        this.rows = page.locator('#tbodyid tr');
        this.placeOrderButton = page.getByRole('button', {name: 'Place Order'});
    }

    row(productName: string): Locator {
        return this.rows.filter({hasText: productName});
    }

    async deleteItem(productName: string) {
        await this.row(productName).getByRole('link', {name: 'Delete'}).click();
    }

   
    async clearCart() {
        let count = await this.rows.count();
        while (count > 0) {
            await this.rows.first().getByRole('link', {name: 'Delete'}).click();
            await expect(this.rows).toHaveCount(count - 1);
            count--;
        }
    }

    async placeOrder() {
        await this.placeOrderButton.click();
    }

}

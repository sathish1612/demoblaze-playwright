import {Page, Locator, expect} from '@playwright/test';

export class OrderPage {
    readonly page: Page
    readonly orderTotal: Locator
    readonly nameInput: Locator
    readonly countryInput: Locator
    readonly cityInput: Locator
    readonly cardInput: Locator
    readonly monthInput: Locator
    readonly yearInput: Locator
    readonly purchaseButton: Locator
    readonly confirmTitle: Locator
    readonly confirmDetails: Locator
    readonly okButton: Locator

    constructor(page: Page) {
        this.page = page;
        this.orderTotal = page.locator('#totalm');
        this.nameInput = page.locator('#name');
        this.countryInput = page.locator('#country');
        this.cityInput = page.locator('#city');
        this.cardInput = page.locator('#card');
        this.monthInput = page.locator('#month');
        this.yearInput = page.locator('#year');
        this.purchaseButton = page.getByRole('button', {name: 'Purchase'});
        this.confirmTitle = page.locator('.sweet-alert h2');
        this.confirmDetails = page.locator('.sweet-alert p.lead');
        this.okButton = page.getByRole('button', {name: 'OK'});
    }

    async makePayment(customer: {name: string, country: string, city: string, card: string, month: string, year: string}) {
        await this.nameInput.fill(customer.name);
        await this.countryInput.fill(customer.country);
        await this.cityInput.fill(customer.city);
        await this.cardInput.fill(customer.card);
        await this.monthInput.fill(customer.month);
        await this.yearInput.fill(customer.year);
        await this.purchaseButton.click();
    }

        async closeConfirmation() {
        await expect(this.page.locator('.sweet-alert')).toHaveClass(/visible/);
        await this.okButton.click();
    }


}

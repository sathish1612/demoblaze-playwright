import {test, expect} from '@playwright/test';
import {HomePage} from '../lib/pages/HomePage';
import {ProductPage} from '../lib/pages/ProductPage';
import {CartPage} from '../lib/pages/CartPage';
import {OrderPage} from '../lib/pages/OrderPage';
import order from '../test-data/orders.json';
import customer from '../test-data/customer.json';

test('add to cart, delete item, checkout and payment', async ({page}) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  const orderPage = new OrderPage(page);

  // Clear the cart
  await page.goto('https://demoblaze.com/');
  await homePage.openCart();
  await cartPage.clearCart();
  await expect(cartPage.rows).toHaveCount(0);

  // Add multiple products to cart
  for (const product of order.products) {
    await page.goto('https://demoblaze.com/');
    await homePage.openProduct(product);
    const message = await productPage.addToCart();
    expect(message).toContain('Product added');
  }
  await homePage.openCart();
  await expect(cartPage.rows).toHaveCount(order.products.length);

  // Delete one product
  await cartPage.deleteItem(order.deleteProduct);
  await expect(cartPage.rows).toHaveCount(order.products.length - 1);
  await expect(cartPage.row(order.deleteProduct)).toHaveCount(0);

   // Checkout
  await cartPage.placeOrder();
  await expect(orderPage.nameInput).toBeVisible();


  // Make payment
  await orderPage.makePayment(customer);
  await expect(orderPage.confirmTitle).toHaveText('Thank you for your purchase!');
  await orderPage.closeConfirmation();
  await expect(page).toHaveURL(/index\.html/);
});

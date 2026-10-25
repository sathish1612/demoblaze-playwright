import {test as setup, expect} from '../fixtures/authFixture';
import {ADMIN_STORAGE_STATE} from '../playwright.config';
import {LoginPage} from '../lib/pages/LoginPage';
import {HomePage} from '../lib/pages/HomePage';

setup('Valid Login', async ({page, testData}) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  await page.goto('https://demoblaze.com/');
  await loginPage.login(testData.username, testData.password);

  await expect(homePage.welcomeUser).toHaveText(`Welcome ${testData.username}`);
  await expect(homePage.logoutLink).toBeVisible();

  await page.context().storageState({path: ADMIN_STORAGE_STATE});
});

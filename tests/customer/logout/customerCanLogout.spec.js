import { test } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';

test('Assert correct customer Logout', async ({ page }) => {
  /* 
  Test:
  1. Open Wizard bank link
  2. Click [Customer Login]
  3. Select Neville Longbottom
  4. Click [Login]
  5. Click [Logout]
  6. Wait for the page URL 
  https://www.globalsqa.com/angularJs-protractor/BankingProject/#/customer
  7. Assert the drop-down is present with empty value 
  */
  const bankHomePage = new BankHomePage(page);
  const customerLoginPage = new CustomerLoginPage(page);
  const accountPage = new CustomerAccountPage(page);

  await bankHomePage.open();
  await bankHomePage.clickCustomerLoginButton();
  await customerLoginPage.selectCustomer('Neville Longbottom');
  await customerLoginPage.clickLoginButton();
  await accountPage.clickLogoutButton();
  await customerLoginPage.waitForOpened();
  await customerLoginPage.assertSelectCustomerDropdownIsVisible();
  await customerLoginPage.assertSelectCustomerDropdownContainsValue('');
});

import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let addCustomerPage;
let openAccountPage;
let customersListPage;
let firstName;
let lastName;
let postCode; 

test.beforeEach(async ({ page }) => {
  addCustomerPage = new AddCustomerPage(page);
  
  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postCode = faker.location.zipCode(); 

    await addCustomerPage.open();
    await addCustomerPage.fillFirstNameField(firstName);
    await addCustomerPage.fillLastNameField(lastName);
    await addCustomerPage.fillPostCodeField(postCode);
    await addCustomerPage.clickAddCustomerButton();
    await page.reload();
});

test('Assert manager can add new customer', async ({ page }) => {
  /* 
  Test:
  1. Click [Open Account].
  2. Select Customer name you just created.
  3. Select currency.
  4. Click [Process].
  5. Reload the page (This is a simplified step to close the popup).
  6. Click [Customers].
  7. Assert the customer row has the account number not empty.

  Tips:
  1. Do not rely on the customer row id for the step 13. 
    Use the ".last()" locator to get the last row.
  */
  addCustomerPage = new AddCustomerPage(page);
  openAccountPage = new OpenAccountPage(page);
  customersListPage = new CustomersListPage(page);

  await addCustomerPage.goOpenAccountTab();
  await openAccountPage.pageLoaded();
  await openAccountPage.selectUser(`${firstName} ${lastName}`)
  await openAccountPage.selectCurrency('Dollar');
  await openAccountPage.clickProcessBtn();
  await page.reload();
  await addCustomerPage.goCustomersTab();
  await customersListPage.waitForLoad();
  await customersListPage.verifyLastRorwCellNotEmpty(3); 

});

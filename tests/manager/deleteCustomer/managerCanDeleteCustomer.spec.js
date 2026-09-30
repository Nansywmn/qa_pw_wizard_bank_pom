import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage'

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode(); 

test.beforeEach(async ({ page }) => {
  /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */
  const addCustomerPage = new AddCustomerPage(page);
 
    await addCustomerPage.open();
    await addCustomerPage.fillFirstNameField(firstName);
    await addCustomerPage.fillLastNameField(lastName);
    await addCustomerPage.fillPostCodeField(postCode);
    await addCustomerPage.clickAddCustomerButton();
    await page.reload();
});

test('Assert manager can delete customer', async ({ page }) => {
  /* 
  Test:
  1. Open Customers page.
  2. Click [Delete] for the row with customer name.
  3. Assert customer row is not present in the table. 
  4. Reload the page.
  5. Assert customer row is not present in the table. 
  */
  const customersListPage = new CustomersListPage(page);

  await customersListPage.open();
  await customersListPage.deleteCustomer(firstName, lastName, postCode);
  await customersListPage.verifyRowCustomerNotPresent(firstName, lastName, postCode);
  await page.reload();
  await customersListPage.verifyRowCustomerNotPresent(firstName, lastName, postCode);


});

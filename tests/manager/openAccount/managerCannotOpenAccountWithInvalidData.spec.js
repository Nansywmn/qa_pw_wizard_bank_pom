import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';


test.describe('Manager cannot open account with invalid data', () => {

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

test('Assert manager cannot open an account without selecting a customer and currency', async ({ page }) => {

  openAccountPage = new OpenAccountPage(page);
  customersListPage = new CustomersListPage(page);

  await customersListPage.open();
  const lastRowBefore = await customersListPage.getLastRowSnapshot();

  await customersListPage.clickOpenAccountBtn();
  await openAccountPage.pageLoaded();
  await openAccountPage.clickProcessBtn();
  await openAccountPage.verifyFieldRequired(openAccountPage.currencySelector);
  await openAccountPage.verifyFieldRequired(openAccountPage.customerSelector);
  await addCustomerPage.goCustomersTab();
  await customersListPage.waitForLoad();
  await customersListPage.verifyLastRowNotChanged(lastRowBefore)


});
test('Assert manager cannot open an account without selecting a currency', async ({ page }) => {

  openAccountPage = new OpenAccountPage(page);
  customersListPage = new CustomersListPage(page);

  await customersListPage.open();
  const lastRowBefore = await customersListPage.getLastRowSnapshot();

  await customersListPage.clickOpenAccountBtn();
  await openAccountPage.pageLoaded();
  await openAccountPage.selectUser(`${firstName} ${lastName}`)
  await openAccountPage.clickProcessBtn();
  await openAccountPage.verifyFieldRequired(openAccountPage.currencySelector);
  await addCustomerPage.goCustomersTab();
  await customersListPage.waitForLoad();
  await customersListPage.verifyLastRowNotChanged(lastRowBefore)
})

test('Assert manager cannot open an account without selecting a customer', async ({ page }) => {

  openAccountPage = new OpenAccountPage(page);
  customersListPage = new CustomersListPage(page);

  await customersListPage.open();
  const lastRowBefore = await customersListPage.getLastRowSnapshot();

  await customersListPage.clickOpenAccountBtn();
  await openAccountPage.pageLoaded();
  await openAccountPage.selectCurrency('Dollar')
  await openAccountPage.clickProcessBtn();
  await openAccountPage.verifyFieldRequired(openAccountPage.customerSelector);
  await addCustomerPage.goCustomersTab();
  await customersListPage.waitForLoad();
  await customersListPage.verifyLastRowNotChanged(lastRowBefore)
})

});

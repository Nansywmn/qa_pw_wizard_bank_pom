import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';


test.describe('Manager can search customer', () => {
let firstName;
let lastName;
let postalCode;
let addCustomerPage;
let customersListPage;
let openAccountPage;

test.beforeEach(async ({ page }) => {
  addCustomerPage = new AddCustomerPage(page);
  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postalCode = faker.location.zipCode();

    await addCustomerPage.open();
    await addCustomerPage.fillFirstNameField(firstName);
    await addCustomerPage.fillLastNameField(lastName);
    await addCustomerPage.fillPostCodeField(postalCode);
    await addCustomerPage.clickAddCustomerButton();
});

test('Assert manager can search customer by Account Number', async ({ page }) => {
  openAccountPage = new OpenAccountPage(page);
  addCustomerPage = new AddCustomerPage(page);
  customersListPage = new CustomersListPage(page);

  await openAccountPage.open();
  await openAccountPage.selectUser(`${firstName} ${lastName}`)
  await openAccountPage.selectCurrency('Dollar');
      let accountNumber = '';
    page.on('dialog', async (dialog) => {
        accountNumber = dialog.message().match(/\d+$/)[0];
        
        await dialog.accept();
      });
  await openAccountPage.clickProcessBtn();
  await addCustomerPage.goCustomersTab();
  await customersListPage.waitForLoad();
  await customersListPage.fillSearchField(accountNumber);
  await customersListPage.verifyRowCustomerPresent(accountNumber);
  await customersListPage.verifyCountRows(1)
});

test('Assert manager can search customer by Account Number', async ({ page }) => {
  openAccountPage = new OpenAccountPage(page);
  addCustomerPage = new AddCustomerPage(page);
  customersListPage = new CustomersListPage(page);

  await openAccountPage.open();
  await openAccountPage.selectUser(`${firstName} ${lastName}`)
  await openAccountPage.selectCurrency('Dollar');
      let accountNumber = '';
    page.on('dialog', async (dialog) => {
        accountNumber = dialog.message().match(/\d+$/)[0];
        
        await dialog.accept();
      });
  await openAccountPage.clickProcessBtn();
  await addCustomerPage.goCustomersTab();
  await customersListPage.waitForLoad();
  await customersListPage.fillSearchField(accountNumber);
  await customersListPage.verifyRowCustomerPresent(accountNumber);
  await customersListPage.verifyCountRows(1)
});

test('Assert search is case-insensitive', async ({ page }) => {

  customersListPage = new CustomersListPage(page);

  const firstNameUpCase = firstName.toUpperCase();


  await customersListPage.open();
  await customersListPage.fillSearchField(firstNameUpCase);
  await customersListPage.verifyRowCustomerPresent(firstNameUpCase);
  await customersListPage.verifyCountRows(1)
});

test('Assert manager can search customer by part of First Name', async ({ page }) => {

  customersListPage = new CustomersListPage(page);

  const firstNamePart = firstName.slice(0, 3);


  await customersListPage.open();
  await customersListPage.fillSearchField(firstNamePart);
  await customersListPage.verifyRowCustomerPresent(firstNamePart);
  await customersListPage.verifyCountRows(1)
});

test('Assert table is empty when searching non-existent customer', async ({ page }) => {

  customersListPage = new CustomersListPage(page);

  const fakeName = faker.string.alphanumeric(20);

  await customersListPage.open();
  await customersListPage.fillSearchField(fakeName);
  await customersListPage.verifyCountRows(0)
});

test('Assert all customers are shown after clearing search', async ({ page }) => {

  customersListPage = new CustomersListPage(page);

  await customersListPage.open();
  
  const rowBefore = await customersListPage.getRowsCount()
  console.log(rowBefore)
  await customersListPage.fillSearchField(firstName);
  await customersListPage.clearSearchField();
  await customersListPage.verifyCountRows(rowBefore)
});

});
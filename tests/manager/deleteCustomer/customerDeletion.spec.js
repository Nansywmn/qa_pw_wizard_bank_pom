import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const postCode = faker.location.zipCode();

test.describe('Customer deletion', () => {

  test.beforeEach(async ({ page }) => {
    const addCustomerPage = new AddCustomerPage(page);

    await addCustomerPage.open();
    await addCustomerPage.fillFirstNameField(firstName);
    await addCustomerPage.fillLastNameField(lastName);
    await addCustomerPage.fillPostCodeField(postCode);
    await addCustomerPage.clickAddCustomerButton();
    await page.reload();
  });

  test('Assert deleting customer does not delete other customers', async ({ page }) => {
    const customersListPage = new CustomersListPage(page);

    await customersListPage.open();
    await expect(customersListPage.getRows().first()).toBeVisible();
    const countBefore = await customersListPage.getRowsCount();
    await customersListPage.deleteCustomer(firstName, lastName, postCode);
    const countAfter = await customersListPage.getRowsCount();
    expect(countAfter).toBe(countBefore - 1);
    await customersListPage.verifyRowCustomerPresent('Harry', 'Potter');
  });

  test('Assert only selected customer is deleted when first names match', async ({ page }) => {
    const addCustomerPage = new AddCustomerPage(page);
    const customersListPage = new CustomersListPage(page);
    const lastNameSecond = faker.person.lastName();

    await addCustomerPage.open();
    await addCustomerPage.fillFirstNameField(firstName);
    await addCustomerPage.fillLastNameField(lastNameSecond);
    await addCustomerPage.fillPostCodeField(postCode);
    await addCustomerPage.clickAddCustomerButton();
    await page.reload();

    await customersListPage.open();
    await customersListPage.deleteCustomer(firstName, lastName, postCode);
    await customersListPage.verifyRowCustomerNotPresent(firstName, lastName, postCode);
    await customersListPage.verifyRowCustomerPresent(firstName, lastNameSecond)

  });

  test('Assert deleted customer is not found by search', async ({ page }) => {

    const customersListPage = new CustomersListPage(page);

    await customersListPage.open();
    await customersListPage.deleteCustomer(firstName, lastName, postCode);
    await customersListPage.fillSearchField(lastName);
    await customersListPage.verifyCountRows(0);


  });

  test('Assert deleted customer is not available in Open Account', async ({ page }) => {

    const openAccountPage = new OpenAccountPage(page);
    const customersListPage = new CustomersListPage(page);

    await customersListPage.open();
    await customersListPage.deleteCustomer(firstName, lastName, postCode);
    await customersListPage.clickOpenAccountBtn();
    await openAccountPage.pageLoaded();
    await openAccountPage.verifyCustomerNotInSelector(firstName, lastName);

  });

  test('Assert deleted customer cannot log in', async ({ page }) => {

    const customersListPage = new CustomersListPage(page);
    const customerLoginPage = new CustomerLoginPage(page);
    const bankHomePage = new BankHomePage(page);

    await customersListPage.open();
    await customersListPage.deleteCustomer(firstName, lastName, postCode);
    await customersListPage.clickHomeBtn();
    await bankHomePage.pageLoaded();
    await bankHomePage.clickCustomerLoginButton();
    await customerLoginPage.waitForOpened();
    await customerLoginPage.verifyCustomerNotInLoginDropdown(firstName, lastName)
  });

});
import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test.describe('Customer creation required fields validation', () => {

  let addCustomerPage;
  let customersListPage;

  test.beforeEach(async ({page}) => {
  addCustomerPage = new AddCustomerPage(page);
  customersListPage = new CustomersListPage(page);

  await addCustomerPage.open();

  });

test('Assert manager cannot add customer without First Name', async ({ page }) => {

    const lastName = faker.person.lastName();
    const postCode = faker.location.zipCode(); 

    await addCustomerPage.fillLastNameField(lastName);
    await addCustomerPage.fillPostCodeField(postCode);
    await addCustomerPage.clickAddCustomerButton();
    await addCustomerPage.verifyFieldRequired(addCustomerPage.firstNameInput);
    await addCustomerPage.goCustomersTab();
    await customersListPage.waitForLoad()

   await customersListPage.verifyLastRowNotContains(lastName)
});


test('Assert manager cannot add customer without Last Name', async ({ page }) => {
    const firstName = faker.person.firstName();
    const postCode = faker.location.zipCode(); 

    await addCustomerPage.fillFirstNameField(firstName);
    await addCustomerPage.fillPostCodeField(postCode);
    await addCustomerPage.clickAddCustomerButton();
    await addCustomerPage.verifyFieldRequired(addCustomerPage.lastNameInput);
    await addCustomerPage.goCustomersTab();
    await customersListPage.waitForLoad()

   await customersListPage.verifyLastRowNotContains(firstName)
  });

test('Assert manager cannot add customer without Post Code', async ({ page }) => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    await addCustomerPage.fillFirstNameField(firstName);
    await addCustomerPage.fillLastNameField(lastName);
    await addCustomerPage.clickAddCustomerButton();
    await addCustomerPage.verifyFieldRequired(addCustomerPage.postCodeInput);
    await addCustomerPage.goCustomersTab();
    await customersListPage.waitForLoad()

   await customersListPage.verifyLastRowNotContains(firstName)
  });



  test('Assert manager cannot add customer with all fields empty', async ({ page }) => {

    await addCustomerPage.goCustomersTab();
    await customersListPage.waitForLoad()

    const rowBefore = await customersListPage.getLastRowSnapshot();
    
    await addCustomerPage.goAddCustomersTab();
    await addCustomerPage.waitForLoad();
    await addCustomerPage.clickAddCustomerButton();
    await addCustomerPage.verifyFieldRequired(addCustomerPage.firstNameInput);
    await addCustomerPage.verifyFieldRequired(addCustomerPage.lastNameInput);
    await addCustomerPage.verifyFieldRequired(addCustomerPage.postCodeInput);
    await addCustomerPage.goCustomersTab();
    await customersListPage.waitForLoad()

   await customersListPage.verifyLastRowNotChanged(rowBefore);
  });

    test('Assert manager cannot add duplicate customer', async ({ page }) => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const postCode = faker.location.zipCode(); 

    await addCustomerPage.fillFirstNameField(firstName);
    await addCustomerPage.fillLastNameField(lastName);
    await addCustomerPage.fillPostCodeField(postCode);
    await addCustomerPage.clickAddCustomerButton();
    await page.reload();
    await addCustomerPage.goCustomersTab();
    await customersListPage.waitForLoad();
   
    await customersListPage.verifyLastRow(firstName, lastName, postCode);

    await addCustomerPage.goAddCustomersTab();
    await addCustomerPage.fillFirstNameField(firstName);
    await addCustomerPage.fillLastNameField(lastName);
    await addCustomerPage.fillPostCodeField(postCode);

    let alertText = '';
    page.on('dialog', async (dialog) => {
        alertText = dialog.message();
        console.log('Алерт повідомлення:', alertText);
        await dialog.accept();
      });
    await addCustomerPage.clickAddCustomerButton();
    await addCustomerPage.verifyAlertMessege(alertText, 'Please check the details. Customer may be duplicate.');
    
    await addCustomerPage.goCustomersTab();
    await customersListPage.waitForLoad();
    await customersListPage.verifyCustomerNotDuplicated(firstName, lastName, postCode);


  });


});

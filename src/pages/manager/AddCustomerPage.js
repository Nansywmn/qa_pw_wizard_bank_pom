import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.getByPlaceholder("First Name");
    this.lastNameInput = page.getByPlaceholder("Last Name");
    this.postCodeInput = page.getByPlaceholder("Post Code");
    this.addCustomerButton = page
      .getByRole("form")
      .getByRole("button", { name: "Add Customer" });
    this.customerTab = page.getByRole("button", { name: "Customers" });
    this.addCustomerTab = page.getByRole('button', { name: 'Add Customer' }).first();
    this.openAccountTab = page.getByRole('button', { name: 'Open Account' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/addCust');
  }

    async waitForLoad() {
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager/addCust');
  }

 async fillFirstNameField(data) {
  await this.firstNameInput.fill(data)
 }
 async fillLastNameField(data) {
  await this.lastNameInput.fill(data)
 }
 async fillPostCodeField(data) {
  await this.postCodeInput.fill(data)
 }
  async clickAddCustomerButton() {
  await this.addCustomerButton.click()
 }
   async goCustomersTab() {
  await this.customerTab.click()
 }
    async goAddCustomersTab() {
  await this.addCustomerTab.click()
 }
     async goOpenAccountTab() {
  await this.openAccountTab.click()
 }

 async verifyFieldRequired(field) {
  await expect(field).toHaveClass(/ng-invalid-required/);
}

async verifyAlertMessege(alertMessege, value){
  await expect(alertMessege).toContain(value);
}


}

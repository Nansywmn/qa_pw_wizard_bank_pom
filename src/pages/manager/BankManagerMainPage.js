import { expect } from '@playwright/test';

export class BankManagerMainPage {
  constructor(page) {
    this.page = page;
    this.addCustomerBtn = page.getByRole('button', { name: 'Add Customer' });
    this.openAccountBtn = page.getByRole('button', { name: 'Open Account' });
    this.customersBtn = page.getByRole('button', { name: 'Customers' });
    this.homeBtn = page.getByRole('button', { name: 'Home' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager');
  }

    async pageLoaded() {
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager');
  }

    async varifyButtonsVisible(){
      await expect(this.addCustomerBtn).toBeVisible();
      await expect(this.openAccountBtn).toBeInViewport();
      await expect(this.customersBtn).toBeVisible();
    }

    async clickHomeBtn() {
      await this.homeBtn.click()
    }

      async varifyButtonsNotVisible(){
      await expect(this.addCustomerBtn).not.toBeVisible();
      await expect(this.openAccountBtn).not.toBeInViewport();
      await expect(this.customersBtn).not.toBeVisible();
    }


}

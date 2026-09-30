import { expect } from '@playwright/test';

export class BankHomePage {
  constructor(page) {
    this.page = page;
    this.customerLoginButton = page.getByRole('button', {name: 'Customer Login'});
    this.managerLoginButton = page.getByRole('button', { name: 'Bank Manager Login' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/login');
  }

      async pageLoaded() {
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/login');
  }

  async clickCustomerLoginButton() {
    await this.customerLoginButton.click();
  }

  async clickManagerLoginButton() {
    await this.managerLoginButton.click();
  }

  async varifyButtonsVisible(){
    await expect(this.customerLoginButton).toBeVisible();
    await expect(this.managerLoginButton).toBeVisible();
  }


}

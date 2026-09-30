import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencySelector = page.getByTestId('currency');
    this.customerSelector = page.getByTestId('userSelect');
    this.processBtn = page.getByRole('button', { name: 'Process' });
  }

    async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

      async pageLoaded() {
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager/openAccount');
  }

    async selectCurrency(currencyName) {
      await this.currencySelector.selectOption(currencyName);
    }

    async selectUser(userName) {
      await this.customerSelector.selectOption(userName);
    }
    
    async clickProcessBtn(){
      await this.processBtn.click();
    }

    async verifySelectCurrency(value) {
      const currentOptionText = this.currencySelector;
    await expect(currentOptionText).toHaveValue(value);
    }

      async verifyCustomerNotInSelector(firstName, lastName) {
  const customerName = `${firstName} ${lastName}`;

  await expect(
    this.customerSelector.locator('option', { hasText: customerName })
  ).toHaveCount(0);
}

     async verifyFieldRequired(field) {
  await expect(field).toHaveClass(/ng-invalid-required/);
}




}

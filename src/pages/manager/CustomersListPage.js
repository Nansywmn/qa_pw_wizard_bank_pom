import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.addCustomerBtn = page.getByRole('button', { name: 'Add Customer' });
    this.openAccountBtn = page.getByRole('button', { name: 'Open Account' });
    this.customersBtn = page.getByRole('button', { name: 'Customers' });
    this.homeBtn = page.getByRole('button', { name: 'Home' });
    this.searchField = page.getByPlaceholder('Search Customer');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }
  async waitForLoad() {
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager/list');
  }

  getLastRow() {
    return this.page.locator('.table.table-bordered.table-striped').locator('tbody tr').last();
  }

async verifyLastRow(firstName, lastName, postCode) {
  const lastRow = await this.getLastRow();
  await expect(lastRow).toContainText(firstName);
  await expect(lastRow).toContainText(lastName);
  await expect(lastRow).toContainText(postCode);
}

async verifyLastRowNotContains(value) {
  const lastRow = await this.getLastRow();
  await expect(lastRow).not.toContainText(value);
}

async getLastRowSnapshot() {
  const lastRow = await this.getLastRow();
  return await lastRow.innerText();
}

async verifyLastRowNotChanged(rowBefore) {
  const lastRow = await this.getLastRow();
  const rowAfter = await lastRow.innerText();
  expect(rowAfter).toBe(rowBefore);
}

  getRows() {
    return this.page.locator('.table.table-bordered.table-striped').locator('tbody tr');
  }

async getRowsCount() {
  await expect(this.getRows().first()).toBeVisible();
  return this.getRows().count();
}

async verifyCustomerNotDuplicated(firstName, lastName, postCode){
    const count = await this.getRows().filter({ hasText: `${firstName} ${lastName} ${postCode}` }).count();
    expect(count).toBe(1);
  }

  getRowCustomer(firstName, lastName, postCode) {
    return this.getRows().filter({ has: this.page.locator('td', {hasText: firstName})}).filter({ has: this.page.locator('td', {hasText: lastName})}).filter({ has: this.page.locator('td', {hasText: postCode})});
  }

async deleteCustomer(firstName, lastName, postCode) {
  const row = this.getRowCustomer(firstName, lastName, postCode);
  await row.getByRole('button', { name: 'Delete' }).click();
}

async verifyRowCustomerNotPresent(firstName, lastName, postCode) {
  const row = this.getRowCustomer(firstName, lastName, postCode);
  await expect(row).toHaveCount(0);
}

async verifyRowCustomerPresent(firstName, lastName) {
  const row = this.getRowCustomer(firstName, lastName);
  await expect(row).toHaveCount(1);
}

async clickOpenAccountBtn() {
    await this.openAccountBtn.click()
    }

async clickHomeBtn() {
    await this.homeBtn.click()
    }

async fillSearchField(value) {
  await this.searchField.fill(value);
}

async verifyCountRows(index) {
  await expect(this.getRows()).toHaveCount(index);
}

async verifyLastRorwCellNotEmpty(index) {
  await expect(this.getLastRow().locator('td').nth(index)).not.toBeEmpty();
}

async clearSearchField() {
  await this.searchField.clear();
}

}

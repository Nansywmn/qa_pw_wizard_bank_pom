import { test } from '@playwright/test';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';
import { TransactionsPage } from '../../../src/pages/customer/TransactionsPage';

test('Assert the empty transactions list has correct values', async ({
  page,
}) => {
  /* 
  Test:
  1. Open Wizard bank login for Customer 
  2. Select "Albus Dumbledore"
  3. Click [Login]
  4. Click [Transactions]
  5. Assert first column header conatins text "Date-Time"
  6. Assert second column header conatins text "Amount"
  7. Assert first column header conatins text "Transaction Type"
  8. Assert the first row in table is hidden
  */
  const customerLoginPage = new CustomerLoginPage(page);
  const accountPage = new CustomerAccountPage(page);
  const transactionsPage = new TransactionsPage(page);

  await customerLoginPage.open();
  await customerLoginPage.selectCustomer('Albus Dumbledore');
  await customerLoginPage.clickLoginButton();
  await accountPage.clickTransactionsButton();
  await transactionsPage.assertHeaderFirstCellContainsText('Date-Time');
  await transactionsPage.assertHeaderSecondCellContainsText('Amount');
  await transactionsPage.assertHeaderThirdCellContainsText('Transaction Type');
  await transactionsPage.assertFirstRowIsHidden();
});

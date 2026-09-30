import { test } from '@playwright/test';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage'

test('Assert manager can choose currencies for account', async ({ page }) => {
  /* 
  Test:
  1. Open the Open account page 
    https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/openAccount
  2. Select currency Dollar
  3. Assert the drop-dwon has value Dollar
  4. Select currency Pound
  5. Assert the drop-dwon has value Pound
  6. Select currency Rupee
  7. Assert the drop-dwon has value Rupee
  */
  const openAccountPage = new OpenAccountPage(page);

  await openAccountPage.open();
  await openAccountPage.selectCurrency('Dollar');
  await openAccountPage.verifySelectCurrency('Dollar');
  await openAccountPage.selectCurrency('Pound');
  await openAccountPage.verifySelectCurrency('Pound');
  await openAccountPage.selectCurrency('Rupee');
  await openAccountPage.verifySelectCurrency('Rupee');

});

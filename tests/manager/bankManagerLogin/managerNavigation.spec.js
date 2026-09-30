import { test } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage'

test('Assert manager buttons are hidden after returning Home', async ({ page }) => {

 const bankHomePage = new BankHomePage(page);
 const bankManagerMainPage = new BankManagerMainPage(page);


 await bankHomePage.open();
 await bankHomePage.clickManagerLoginButton();
 await bankManagerMainPage.pageLoaded();
 await bankManagerMainPage.verifyButtonsVisible();
 await bankManagerMainPage.clickHomeBtn();
 await bankHomePage.pageLoaded();
 await bankManagerMainPage.verifyButtonsNotVisible()
 await bankHomePage.verifyButtonsVisible();

});

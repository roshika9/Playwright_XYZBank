const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pom/loginpage.js');
const {AccountPage} = require('../pom/accountpage.js');
const transactions = require('../test-data/transactions.json');

test('2. Login as Customer and perform transactions', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const accountpage = new AccountPage(page);

    // Navigate to the login page
    await loginPage.NavigateToLoginPage(loginPage.url);

    // Click on the customer Login button
    await loginPage.ClickCustomerLoginButton();

    // Select a customer from the dropdown and Login
    await loginPage.SelectCustomerFromDropdown("Hermoine Granger");

    //Select an account number
    await accountpage.SelectAccountNumber(1003);

    // Process transactions
    await accountpage.CalculateBalance(transactions);

});
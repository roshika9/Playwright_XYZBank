const { expect } = require('@playwright/test');

class LoginPage {
    constructor(page) {
        this.page = page;
        this.baseurl = 'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/';
        this.url = `${this.baseurl}login`;
        this.urlManager = `${this.baseurl}manager`;
        this.urlCustomer = `${this.baseurl}customer`;
        this.urlAddCust = `${this.urlManager}/addCust`;
        this.urlAccounts = `${this.baseurl}account`;
        this.btnBankManagerLogin = page.locator('button[ng-click="manager()"]');
        this.btnAddCustomer = page.locator('button[ng-click="addCust()"]');
        this.btnCustomerLogin = page.locator('button[ng-click="customer()"]');
        this.customerDropdown = page.locator('select[ng-model="custId"]');
        this.btnLogin = page.locator('button[type="submit"]');


    }

    async NavigateToLoginPage(url = this.url) {
        await this.page.goto(url);
        await expect(this.page).toHaveURL(url);
        console.log(`Navigated to ${url}`);
    }

    async ClickBankManagerLoginButton(urlManager = this.urlManager) {
        await this.btnBankManagerLogin.click();
        await expect(this.page).toHaveURL(urlManager);
        console.log(`Navigated to ${urlManager}`);
    }

    async ClickCustomerLoginButton(urlCustomer = this.urlCustomer) {
        await this.btnCustomerLogin.click();
        await expect(this.page).toHaveURL(urlCustomer);
        console.log(`Navigated to ${urlCustomer}`);
    }

    async ClickOnAddCustomerButton(urlAddCust = this.urlAddCust) {
        await this.btnAddCustomer.click();
        await expect(this.page).toHaveURL(urlAddCust);
        console.log('Clicked on Add Customer button');
    }

    async SelectCustomerFromDropdown(customerName, urlAccounts = this.urlAccounts) {
        await this.customerDropdown.waitFor({ state: 'visible' });
        await this.customerDropdown.selectOption({ label: customerName });
        console.log(`Selected customer: ${customerName}`);
        await this.btnLogin.click();
        await expect(this.page).toHaveURL(this.urlAccounts);
        console.log(`Navigated to ${urlAccounts}`);
        
    }
}

module.exports = { LoginPage };
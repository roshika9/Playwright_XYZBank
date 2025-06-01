const { expect } = require('@playwright/test');

class AddCustomerPage {
    constructor(page) {
        this.page = page;
        this.txtFirstName = page.locator('input[ng-model="fName"]');
        this.txtLastName = page.locator('input[ng-model="lName"]');
        this.txtPostCode = page.locator('input[ng-model="postCd"]');
        this.btnAddCustomer = page.locator('button[type="submit"]');
        this.btnCustomers = page.locator('button[ng-click="showCust()"]');

    }

    async AddCustomer(firstName, lastName, postCode) {
        await this.txtFirstName.fill(firstName);
        await this.txtLastName.fill(lastName);
        await this.txtPostCode.fill(postCode);
        await this.btnAddCustomer.click();
        console.log(`Added customer: ${firstName} ${lastName}, Post Code: ${postCode}`);
    }

    async isCustomerPresent(FirstName, LastName, Postcode) {
        const rowLocator = this.page.locator(
            `tbody tr:has(td:text-is("${FirstName}")):has(td:text-is("${LastName}")):has(td:text-is("${Postcode}"))`
        );
        const count = await rowLocator.count();
        return count > 0;
    }

    async VerifyCustomersAdded(customers) {
        await this.btnCustomers.click();
        await this.page.waitForSelector('tbody tr');
        for (const { FirstName, LastName, Postcode } of customers) {

            const exists = await this.isCustomerPresent(FirstName, LastName, Postcode);
            expect(exists).toBeTruthy();
            console.log(`Customer ${FirstName} ${LastName} (${Postcode}) verified successfully.`);
        }
    }

    async DeleteCustomers(FirstName, LastName, Postcode) {
        const rowLocator = this.page.locator(
            `tbody tr:has(td:text-is("${FirstName}")):has(td:text-is("${LastName}")):has(td:text-is("${Postcode}"))`
        );
        const count = await rowLocator.count();
        if (count === 0) {
            console.log(`Customer ${FirstName} ${LastName} (${Postcode}) not found.`);
            return;
        }
        for (let i = 0; i < count; i++) {
            const row = rowLocator.nth(i);
            const deleteButton = row.locator('button[ng-click="deleteCust(cust)"]');
            await deleteButton.click();
            console.log(`Deleted customer: ${FirstName} ${LastName} (${Postcode})`);
        }
    }
}

module.exports = { AddCustomerPage };
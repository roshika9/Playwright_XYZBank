const { expect } = require('@playwright/test');

class AccountPage {
    constructor(page) {
        this.page = page;
        this.accountDropdown = this.page.locator('select[ng-model="accountNo"]');
        this.depositTab = this.page.locator('button[ng-click="deposit()"]');
        this.withdrawTab = this.page.locator('button[ng-click="withdrawl()"]');
        this.amountInput = this.page.locator('input[ng-model="amount"]');
        this.btnSubmit = this.page.locator('button[type="submit"]');
        this.txtBalance = this.page.locator('div:nth-child(3) > strong:nth-child(2)');
        this.transactionMessage = this.page.locator('[ng-show="message"]');
    }

    async SelectAccountNumber(accountNo) {
        await this.accountDropdown.waitFor({ state: 'visible' });
        await this.accountDropdown.selectOption({ label: accountNo.toString() });
        console.log(`Selected account number: ${accountNo}`);
    }

    async VerifyTransactionMessage(expectedText) {
        await expect(this.transactionMessage).toBeVisible();
        const message = await this.transactionMessage.textContent();
        expect(message.trim()).toContain(expectedText);
        console.log(`Transaction message : ${message.trim()}`);
    }

    async Deposit(amount) {
        await this.depositTab.click();
        await this.page.waitForTimeout(300);
        await this.amountInput.fill(amount.toString());
        console.log(`Depositing amount: ${amount}`);
        await this.btnSubmit.click();
        await this.VerifyTransactionMessage('Deposit Successful');
    }

    async Withdraw(amount) {
        await this.withdrawTab.click();
        await this.page.waitForTimeout(300);
        await this.amountInput.fill(amount.toString());
        console.log(`Withdrawing amount: ${amount}`);
        await this.btnSubmit.click();
        await this.VerifyTransactionMessage('Transaction successful');
    }

    async GetBalance() {
        await this.txtBalance.waitFor({ state: 'visible' });
        const balance = await this.txtBalance.textContent();
        return parseInt(balance, 10);
    }

    async CalculateBalance(transactions) {
        let expectedBalance = await this.GetBalance();
        for (const tx of transactions) {
            if (tx.type === 'credit') {
                await this.Deposit(tx.amount);
                expectedBalance += tx.amount;
            } else if (tx.type === 'debit') {
                await this.Withdraw(tx.amount);
                expectedBalance -= tx.amount;
            }
            const actualBalance = await this.GetBalance();
            console.log(`Expected balance: ${expectedBalance}, Actual balance: ${actualBalance}`);
            expect(actualBalance).toBe(expectedBalance);
        }
    }
}

module.exports = { AccountPage };
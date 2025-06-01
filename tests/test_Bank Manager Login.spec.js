const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pom/loginpage.js');
const { AddCustomerPage } = require('../pom/addCustomerpage.js');
const customerData = require('../test-data/customerData.json');

test('1. Login as Bank Manager and create customers', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const addCustomerPage = new AddCustomerPage(page);

  // Navigate to the login page
  await loginPage.NavigateToLoginPage(loginPage.url);

  // Click on the Bank Manager Login button
  await loginPage.ClickBankManagerLoginButton();

  // Click on the Add Customer button
  await loginPage.ClickOnAddCustomerButton();

  // Add customers using the data from customerData.json
  for (const customer of customerData) {
    await addCustomerPage.AddCustomer(customer.FirstName, customer.LastName, customer.Postcode);
  }

  // Verify all customers are present in the table
  await addCustomerPage.VerifyCustomersAdded(customerData);

  // Delete the customers
  await addCustomerPage.DeleteCustomers('Jackson', 'Frank', 'L789C349');
  await addCustomerPage.DeleteCustomers('Christopher', 'Connely', 'L789C349');

});


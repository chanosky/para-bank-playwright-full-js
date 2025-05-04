import { expect } from '@playwright/test';

export class AccountPage {
  constructor(page) {
    this.page = page;
  }

  // Method to open a new account
  async openNewAccount() {
    // Click on the 'Open New Account' link
    await this.page.getByRole('link', { name: 'Open New Account' }).click();

    // Select account type from dropdown (option '1' = SAVINGS)
    await this.page.locator('#type').selectOption('1');

    // Wait for 3 seconds before proceeding (could be optimized)
    await this.page.waitForTimeout(3000);

    // Click the 'Open New Account' button using XPath locator
    await this.page.locator('//*[@type="button"][contains(@value, "Open New Account")]').click();

    // Wait for the account creation result page to load
    await this.page.waitForTimeout(3000);

    // Assert that the "Account Opened!" header is visible
    await expect(
      this.page.locator('//*[@id="openAccountResult"]/h1[contains(text(), "Account Opened!")]')
    ).toBeVisible();

    // Assert the confirmation message is visible
    await expect(
      this.page.getByText('Congratulations, your account is now open')
    ).toBeVisible();

    // Assert the presence of the label showing the new account number
    await expect(this.page.getByText('Your new account number:')).toBeVisible();

    // Capture the text content of the new account number
    const accountnumber = await this.page.locator('//*[@id="newAccountId"]').textContent();

    // Click the newly created account number link to navigate to details page
    await this.page.locator('//*[@id="newAccountId"]').click();

    // Verify that the 'Account Details' header is visible
    await expect(
      this.page.locator(`//*[text()='Account Details']`)
    ).toBeVisible();

    // Wait to ensure account details are fully loaded
    await this.page.waitForTimeout(3000);

    // Get the account type text (e.g., SAVINGS)
    const accounttype = await this.page.locator('//*[@id="accountType"]').textContent();

    // Get the account number displayed on the account details page
    const accountnumberdetailspage = await this.page
      .locator('//*[@id="accountId"]')
      .textContent();

    // Validate that the account type is 'SAVINGS'
    expect(accounttype.trim()).toMatch('SAVINGS');

    // Ensure the account number on details page matches the one returned initially
    expect(accountnumber.trim()).toMatch(accountnumberdetailspage);

    // Return the account number for downstream use
    return accountnumber;
  }

  // Method to validate that the new account appears in the accounts overview
  async validateOverview(accountNumber) {
    // Navigate to the 'Accounts Overview' page
    await this.page.getByRole('link', { name: 'Accounts Overview' }).click();

    // Locate the specific account link using the account number
    const accountLink = this.page.getByRole('link', { name: accountNumber });

    // Verify that the account link is visible
    await accountLink.isVisible();

    // Get the row (tr) containing the account info
    const balanceRow = accountLink.locator('xpath=ancestor::tr');

    // Verify the entire row is visible
    await balanceRow.isVisible();
  }
}

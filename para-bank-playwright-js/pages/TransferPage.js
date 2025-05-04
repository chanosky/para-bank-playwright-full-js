import { expect } from '@playwright/test';

export class TransferPage {
  constructor(page) {
    this.page = page;
  }

  // Method to transfer funds from the provided account to another account
  async transferFunds(accNumber, cashtx) {
    // Navigate to the 'Transfer Funds' page
    await this.page.getByRole('link', { name: 'Transfer Funds' }).click();

    // Enter the amount to be transferred
    await this.page.locator(`[id="amount"]`).fill(cashtx.transfercash);

    // Select the "From Account" dropdown option using the provided account number
    await this.page.locator('//*[@id="fromAccountId"]').selectOption(accNumber);

    // Get all available "To Account" options and filter out the one matching the 'From Account'
    const allToAccountValues = await this.page.$$eval(
      '//*[@id="toAccountId"]',
      options => options.map(option => option.value)
    );
    const differentToAccount = allToAccountValues.find(value => value !== accNumber);

    // Select a different "To Account" to complete the transfer
    await this.page.locator('//*[@id="toAccountId"]').selectOption(differentToAccount);

    // Click on the 'Transfer' button to initiate the transfer
    await this.page.locator(`[value="Transfer"]`).click();

    // Confirm that the "Transfer Complete!" message is visible
    await expect(this.page.locator(`//*[text()='Transfer Complete!']`)).toBeVisible();

    // Confirm the transaction summary message is visible and correct
    await expect(
      this.page.getByText(
        `$${cashtx.transfercash}.00 has been transferred from account #${accNumber} to account #${differentToAccount}`
      )
    ).toBeVisible();

    // Confirm the post-transfer advisory message is visible
    await expect(
      this.page.getByText(`See Account Activity for more details.`)
    ).toBeVisible();

    // Return transaction info for validation or logging
    return {
      transCash: cashtx.transfercash,
      toAccount: differentToAccount
    };
  }
}

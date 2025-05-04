import { expect } from '@playwright/test';

export class BillPayPage {
  constructor(page) {
    this.page = page;
  }

  // Method to perform a bill payment using given account number and biller information
  async payBill(accNumber, biller) {
    // Navigate to the 'Bill Pay' section
    await this.page.getByRole('link', { name: 'Bill Pay' }).click();

    // Fill in biller details in the form fields
    await this.page.locator('input[name="payee\\.name"]').fill(biller.billfirstName);
    await this.page.locator('input[name="payee\\.address\\.street"]').fill(biller.billaddress);
    await this.page.locator('input[name="payee\\.address\\.city"]').fill(biller.billcity);
    await this.page.locator('input[name="payee\\.address\\.state"]').fill(biller.billstate);
    await this.page.locator('input[name="payee\\.address\\.zipCode"]').fill(biller.billzipCode);
    await this.page.locator('input[name="payee\\.phoneNumber"]').fill(biller.billphone);

    // Enter the account number to which payment is linked and verify it
    await this.page.locator('input[name="payee\\.accountNumber"]').fill('12345');
    await this.page.locator('input[name="verifyAccount"]').fill('12345');

    // Fill the amount to be paid
    await this.page.locator('input[name="amount"]').fill(biller.billcash);

    // Select the account from which to pay (dropdown)
    await this.page.getByRole('combobox').selectOption(accNumber);

    // Wait to ensure the page elements stabilize (optional optimization)
    await this.page.waitForTimeout(3000);

    // Click the 'Send Payment' button (located via XPath)
    await this.page.locator('//*[@id="billpayForm"]/form/table/tbody/tr[14]/td[2]/input').click();

    // Validate that the bill payment result page is shown
    await expect(
      this.page.locator('//*[@id="billpayResult"]/h1[contains(text(), "Bill Payment Complete")]')
    ).toBeVisible();

    // Confirm the message about checking account activity is visible
    await expect(
      this.page.locator('//*[@id="billpayResult"]/p[contains(text(), "See Account Activity for more details.")]')
    ).toBeVisible();

    // Confirm the detailed payment success message is visible and correct
    await expect(
      this.page.getByText(
        `Bill Payment to ${biller.billfirstName} in the amount of $${biller.billcash}.00 from account ${accNumber} was successful.`
      )
    ).toBeVisible();

    // Return a summary of the transaction for further assertions/logging
    return {
      account: accNumber,
      payee: biller.billfirstName,
      cash: biller.billcash
    };
  }
}

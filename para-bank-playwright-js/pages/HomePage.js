export class HomePage {
  constructor(page) {
    this.page = page;
  }

  // Method to verify visibility of all expected navigation menu links
  async verifyNavigationMenu() {
    // Define the expected navigation links
    const links = [
      'Accounts Overview',
      'Open New Account',
      'Transfer Funds',
      'Bill Pay',
      'Find Transactions',
      'Update Contact Info',
      'Request Loan',
      'Log Out',
    ];

    // Iterate through each link and assert it is visible on the page
    for (const text of links) {
      await this.page.getByRole('link', { name: text }).isVisible();
    }
  }

  // Method to log out of the application
  async logOut() {
    // Click on the 'Log Out' link
    await this.page.getByRole('link', { name: 'Log Out' }).click();

    // Verify that the 'Customer Login' text appears, indicating successful logout
    await this.page.getByText('Customer Login').isVisible();
  }
}
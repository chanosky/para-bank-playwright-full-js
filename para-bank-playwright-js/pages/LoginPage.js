import { expect } from '@playwright/test';

export class LoginPage {
  constructor(page) {
    this.page = page;
  }

  // Method to log in with provided username and password
  async login(username, password) {
    // Navigate to the login page
    await this.page.goto('/parabank/index.htm');

    // Locate the 'Customer Login' heading and ensure it is visible
    const welcomeHeading = this.page.getByRole('heading', { name: 'Customer Login' });
    await expect(welcomeHeading).toBeVisible();

    // Locate username and password input fields
    const usernameInput = this.page.locator('input[name="username"]');
    const passwordInput = this.page.locator('input[name="password"]');

    // Ensure both input fields are visible before interacting with them
    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();

    // Fill in credentials
    await usernameInput.fill(username);
    await passwordInput.fill(password);

    // Locate and click the 'Log In' button after verifying it's enabled
    const loginButton = this.page.getByRole('button', { name: 'Log In' });
    await expect(loginButton).toBeEnabled();
    await loginButton.click();
  }
}

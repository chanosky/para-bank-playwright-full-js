import { expect } from '@playwright/test';

export class RegisterPage {
  constructor(page) {
    this.page = page;
  }

  // Navigate to the registration page and verify the heading
  async navigate() {
    await this.page.goto('/parabank/register.htm');

    // Confirm the presence of the registration page heading
    const signupHeading = this.page.getByRole('heading', { name: 'Signing up is easy!' });
    await expect(signupHeading).toBeVisible();
  }

  // Fill out and submit the registration form using user-provided data
  async register(user) {
    // First Name
    await expect(this.page.locator('#customer\\.firstName')).toBeVisible();
    await this.page.locator('#customer\\.firstName').fill(user.firstName);

    // Last Name
    await expect(this.page.locator('#customer\\.lastName')).toBeVisible();
    await this.page.locator('#customer\\.lastName').fill(user.lastName);

    // Street Address
    await expect(this.page.locator('#customer\\.address\\.street')).toBeVisible();
    await this.page.locator('#customer\\.address\\.street').fill(user.address);

    // City
    await expect(this.page.locator('#customer\\.address\\.city')).toBeVisible();
    await this.page.locator('#customer\\.address\\.city').fill(user.city);

    // State
    await expect(this.page.locator('#customer\\.address\\.state')).toBeVisible();
    await this.page.locator('#customer\\.address\\.state').fill(user.state);

    // Zip Code
    await expect(this.page.locator('#customer\\.address\\.zipCode')).toBeVisible();
    await this.page.locator('#customer\\.address\\.zipCode').fill(user.zipCode);

    // Phone Number
    await expect(this.page.locator('#customer\\.phoneNumber')).toBeVisible();
    await this.page.locator('#customer\\.phoneNumber').fill(user.phone);

    // Social Security Number
    await expect(this.page.locator('#customer\\.ssn')).toBeVisible();
    await this.page.locator('#customer\\.ssn').fill(user.ssn);

    // Username
    await expect(this.page.locator('#customer\\.username')).toBeVisible();
    await this.page.locator('#customer\\.username').fill(user.username);

    // Password
    await expect(this.page.locator('#customer\\.password')).toBeVisible();
    await this.page.locator('#customer\\.password').fill(user.password);

    // Confirm Password
    await expect(this.page.locator('#repeatedPassword')).toBeVisible();
    await this.page.locator('#repeatedPassword').fill(user.password);

    // Submit the registration form
    const registerButton = this.page.getByRole('button', { name: 'Register' });
    await expect(registerButton).toBeEnabled();
    await registerButton.click();

    // Validate success message indicating registration and login
    const successMsg = this.page.getByText('Your account was created successfully. You are now logged in.');
    await expect(successMsg).toBeVisible();
  }
}

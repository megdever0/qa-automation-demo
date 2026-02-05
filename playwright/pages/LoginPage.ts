import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/qa-automation-demo/login.html');
  }

  async fillUsername(username: string) {
    await this.page.locator('#username').fill(username);
  }

  async fillPassword(password: string) {
    await this.page.locator('#password').fill(password);
  }

  async clickLoginButton() {
    await this.page.locator('button[type="submit"]').click();
  }

  async login(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }

  // Inputs
  get usernameInput(): Locator {
    return this.page.locator('#username');
  }

  get passwordInput(): Locator {
    return this.page.locator('#password');
  }

  // Success message
  get successMessage(): Locator {
    return this.page.locator('#success-message');
  }

  // Error messages
  get userNameErrorMessage(): Locator {
    return this.page.locator('.error-message').nth(0);
  }

  get passwordErrorMessage(): Locator {
    return this.page.locator('.error-message').nth(1);
  }
}

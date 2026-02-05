import { Page, Locator } from '@playwright/test';

export class WelcomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/qa-automation-demo/welcome.html');
  }

  // Messages / headings

  get heading(): Locator {
    return this.page.locator('h1');
  }

  get welcomeMessage(): Locator {
    return this.page.locator('#welcome-message');
  }

  get userNameMessage(): Locator {
    return this.page.locator('p[id="welcome-message"] strong');
  }

  // Buttons
  get homeButton(): Locator {
    return this.page.locator('button:has-text("Return to Home")');
  }

  get loginButton(): Locator {
    return this.page.locator('button:has-text("Return to Login Page")');
  }


  async clickReturnToHome() {
    await this.page.click('button:has-text("Return to Home")');
  }

  async clickReturnToLogin() {
    await this.page.click('button:has-text("Return to Login Page")');
  }

}

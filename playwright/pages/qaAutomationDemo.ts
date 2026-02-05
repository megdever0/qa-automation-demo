import { Page, Locator } from '@playwright/test';

export class QAPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/qa-automation-demo');
  }

  // Navigation links
  get homeNavLink(): Locator {
    return this.page.locator('nav a:has-text("Home")');
  }

  get aboutNavLink(): Locator {
    return this.page.locator('nav a:has-text("About")');
  }

  get projectsNavLink(): Locator {
    return this.page.locator('nav a:has-text("Projects")');
  }

  // Footer links
  get footerLinkedinLink(): Locator {
    return this.page.locator('a[aria-label="LinkedIn"]');
  }

  get footerGithubLink(): Locator {
    return this.page.locator('a[aria-label="GitHub"]');
  }

  // Logo
  get logoLink(): Locator {
    return this.page.locator('.logo a');
  }

  //Buttons
  get githubButton(): Locator {
    return this.page.locator('//button[normalize-space()="Check Out My GitHub"]');
  }

  get projectsButton(): Locator {
    return this.page.locator('//button[normalize-space()="View Projects"]');
  }

  get linkedInButton(): Locator {
    return this.page.locator('//button[normalize-space()="Check Out My LinkedIn"]');
  }

  // Dark Mode Toggle

  async isDarkModeToggleVisible() {
    return this.page.locator('//span[@class="slider round"]').isVisible();
  }

  async toggleDarkMode() {
    await this.page.locator('//span[@class="slider round"]').click();
  }

}

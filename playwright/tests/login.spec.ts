import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { QAPage } from '../pages/qaAutomationDemo';
import { ProjectPage } from '../pages/projectsPage';
import { WelcomePage } from '../pages/WelcomePage';

test.describe('Login Page Tests', () => {
  let indexPage: QAPage;
  let projectsPage: ProjectPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    // Wait 1 second before each test
    await page.waitForTimeout(1000);
    indexPage = new QAPage(page);
    projectsPage = new ProjectPage(page);
    loginPage = new LoginPage(page);
    await indexPage.goto();
    await indexPage.projectsNavLink.click();
    await expect(page).toHaveURL(/.*projects.html/);
    await projectsPage.getLoginPageButton.click();
    await expect(page).toHaveURL(/.*login.html/);
  });

  test('@Login_TC01 Verify User Can Navigate To The Login Page', async ({ page }) => {
    await expect(page).toHaveTitle('Login Portal');
    const heading = page.locator('h2');
    await expect(heading).toContainText('Login Portal');
  });

  test('@Login_TC02 Verify username input field Is Visible', async () => {
    const usernameInput = await loginPage.usernameInput;
    await expect(usernameInput).toBeVisible();
    await expect(usernameInput).toHaveAttribute('placeholder', 'Enter username');
  });

  test('@Login_TC03 Verify password input Is Visible', async () => {
    const passwordInput = await loginPage.passwordInput;
    await expect(passwordInput).toBeVisible();
    await expect(passwordInput).toHaveAttribute('placeholder', 'Enter password');
  });

  test('@Login_TC04 Verify password input Is Visible', async ({ page }) => {
    const loginButton = page.locator('button[type="submit"]');
    await expect(loginButton).toBeVisible();
    await expect(loginButton).toContainText('Login');
  });

  test('@Login_TC05 Verify username field fills correctly', async () => {
    await loginPage.fillUsername('testuser');
    await loginPage.page.waitForTimeout(500);
    const usernameInput = await loginPage.usernameInput;
    await expect(usernameInput).toHaveValue('testuser');
  });

  test('@Login_TC06 Verify username field fills correctly', async () => {
    await loginPage.fillPassword('password123');
    await loginPage.page.waitForTimeout(500);
    const passwordInput = await loginPage.passwordInput;
    await expect(passwordInput).toHaveValue('password123');
  });

  test('@Login_TC07 Verify user can log in successfully', async () => {
    await loginPage.fillUsername('testuser123');
    await loginPage.fillPassword('Password!234');
    await loginPage.page.waitForTimeout(500);
    await loginPage.clickLoginButton();
    const successMessage = await loginPage.successMessage;
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toContainText(/login successful!/i);
    await loginPage.page.waitForTimeout(3000);
    await expect(loginPage.page).toHaveURL(/\/welcome\.html$/);
  });

  test('@Login_TC08 Password must be at least 12 characters', async () => {
    await loginPage.fillUsername('testuser123');
    await loginPage.fillPassword('Pass1!');
    await expect(loginPage.usernameInput).toHaveValue('testuser123');
    await expect(loginPage.passwordInput).toHaveValue('Pass1!');
    await loginPage.clickLoginButton();

    await loginPage.page.waitForTimeout(500);
    const errorMessage = loginPage.passwordErrorMessage;
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText(/at least 12 characters/i);

    await expect(loginPage.page).not.toHaveURL(/\/welcome\.html$/);
  });

  test('@Login_TC09 Password must contain a number', async () => {
    await loginPage.fillUsername('testuser123');
    await loginPage.fillPassword('Password!!!!');
    await expect(loginPage.usernameInput).toHaveValue('testuser123');
    await expect(loginPage.passwordInput).toHaveValue('Password!!!!');
    await loginPage.clickLoginButton();

    await loginPage.page.waitForTimeout(500);
    const errorMessage = loginPage.passwordErrorMessage;
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText(/at least 1 number/i);

    await expect(loginPage.page).not.toHaveURL(/\/welcome\.html$/);
  });


  test('@Login_TC10 Password must contain an uppercase letter', async () => {
    await loginPage.fillUsername('testuser123');
    await loginPage.fillPassword('password!234');
    await expect(loginPage.usernameInput).toHaveValue('testuser123');
    await expect(loginPage.passwordInput).toHaveValue('password!234');
    await loginPage.clickLoginButton();

    await loginPage.page.waitForTimeout(500);
    const errorMessage = loginPage.passwordErrorMessage;
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText(/uppercase/i);

    await expect(loginPage.page).not.toHaveURL(/\/welcome\.html$/);
  });

  test('@Login_TC11 Password must contain a special character', async () => {
    await loginPage.fillUsername('testuser123');
    await loginPage.fillPassword('Password1234');
    await expect(loginPage.usernameInput).toHaveValue('testuser123');
    await expect(loginPage.passwordInput).toHaveValue('Password1234');
    await loginPage.clickLoginButton();

    await loginPage.page.waitForTimeout(500);
    const errorMessage = loginPage.passwordErrorMessage;
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText(/special character/i);

    await expect(loginPage.page).not.toHaveURL(/\/welcome\.html$/);
  });

  test('@Login_TC12 should have navigation links', async ({ page }) => {
    const homeLink = page.locator('nav a:has-text("Home")');
    const aboutLink = page.locator('nav a:has-text("About")');
    const projectsLink = page.locator('nav a:has-text("Projects")');

    await expect(homeLink).toBeVisible();
    await expect(aboutLink).toBeVisible();
    await expect(projectsLink).toBeVisible();
  });

  test('@Login_TC13 should navigate to home page from logo', async ({ page }) => {
    const logoLink = page.locator('.logo a');
    await logoLink.click();
    await expect(page).toHaveURL(/\/index\.html$/);
  });

  test('@Login_TC14 should have footer with copyright', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toContainText('2026 megDever0');
  });
});

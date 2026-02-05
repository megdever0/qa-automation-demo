import { test, expect } from '@playwright/test';
import { WelcomePage } from '../pages/WelcomePage';
import { QAPage } from '../pages/qaAutomationDemo';
import { ProjectPage } from '../pages/projectsPage';
import { LoginPage } from '../pages/LoginPage';

test.describe('Welcome Page Tests', () => {
  let indexPage: QAPage;
  let projectsPage: ProjectPage;
  let loginPage: LoginPage;
  let welcomePage: WelcomePage;
  let username = 'testuser123';
  let password = 'Password!234';

  test.beforeEach(async ({ page }) => {
    await page.waitForTimeout(1000);
    indexPage = new QAPage(page);
    projectsPage = new ProjectPage(page);
    loginPage = new LoginPage(page);
    welcomePage = new WelcomePage(page);
    await indexPage.goto();
    await indexPage.projectsNavLink.click();
    await expect(page).toHaveURL(/.*projects.html/);
    await projectsPage.getLoginPageButton.click();
    await expect(page).toHaveURL(/.*login.html/);
    await loginPage.login(username, password);
  });

  test('Welcome_TC01 Verify Welcome Page Loads', async ({ page }) => {
    await expect(page).toHaveTitle('Welcome');
    await expect(page).toHaveURL(/.*welcome.html/);
  });

  test('Welcome_TC02 Verify Welcome Page Heading', async () => {
    const heading = await welcomePage.heading;
    await expect(heading).toContainText('Welcome! 🎉');
  });

  test('Welcome_TC03 Verify Welcome Page Message', async () => {
    const message = await welcomePage.welcomeMessage;
    await expect(message).toBeVisible();
  });

  test('Welcome_TC04 Verify Welcome Page Message Username', async () => {
    const username = await welcomePage.userNameMessage;
    await expect(username).toContainText('testuser123');
  });

  test('Welcome_TC05 Verify display of Return to Home button', async () => {
    const homeButton = await welcomePage.homeButton;
    await expect(homeButton).toBeVisible();
    await expect(homeButton).toContainText('Return to Home');
  });

  test('Welcome_TC06 Verify display of Return to Login button', async () => {
    const loginButton = await welcomePage.loginButton;
    await expect(loginButton).toBeVisible();
    await expect(loginButton).toContainText('Return to Login Page');
  });

  test('Welcome_TC07 Verify clicking Return to Home buttom', async ({ page }) => {
    await welcomePage.clickReturnToHome();
    await expect(page).toHaveURL(/\/index\.html$/);
  });

  test('Welcome_TC08 Verify clicking Return to Login button', async ({ page }) => {
    await welcomePage.clickReturnToLogin();
    await expect(page).toHaveURL(/.*login.html/);
  });
  
  test('Welcome_TC08 Verify Footer', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toContainText('2026 megDever0');
  });
});

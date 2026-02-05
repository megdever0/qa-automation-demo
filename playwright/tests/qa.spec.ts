import { test, expect } from '@playwright/test';
import { QAPage } from '../pages/qaAutomationDemo';
import { ProjectPage } from '../pages/projectsPage';

test.describe('QA Automation Demo Page Tests', () => {
    let indexPage: QAPage;

    test.beforeEach(async ({ page }) => {
        // Wait 1 second before each test
        await page.waitForTimeout(1000);
        indexPage = new QAPage(page);
        await indexPage.goto();
    });

    test('@QA_TC01 Verify User Can Navigate To The My QA Portfolio Page', async ({ page }) => {
        await expect(page).toHaveTitle('My QA Portfolio');
        const heading = page.locator('h1');
        await expect(heading).toContainText('Welcome to My QA Portfolio');
    });

    test('@QA_TC02 Verify Navigation Links Are Visible', async ({ page }) => {
        await expect(indexPage.homeNavLink).toBeVisible();
        await expect(indexPage.aboutNavLink).toBeVisible();
        await expect(indexPage.projectsNavLink).toBeVisible();
    });

    test('@QA_TC03 Verify Buttons Are Visible', async ({ page }) => {
        await expect(indexPage.githubButton).toBeVisible();
        await expect(indexPage.projectsButton).toBeVisible();
        await expect(indexPage.linkedInButton).toBeVisible();
    });

    test('@QA_TC04 Verify Social Links In Footer', async ({ page }) => {
        await expect(indexPage.footerLinkedinLink).toBeVisible();
        await expect(indexPage.footerGithubLink).toBeVisible();
    });

    test('@QA_TC05 Verify Dark Mode toggle', async () => {
        const isDarkModeVisible = await indexPage.isDarkModeToggleVisible;
        await expect(isDarkModeVisible).toBeTruthy();
    });

    test('@QA_TC06 Verify Clicking Logo Returns User To My QA Portfolio Page', async ({ page }) => {
        await indexPage.logoLink.click();
        await expect(page).toHaveURL(/\/index\.html$/);
    });

    test('@QA_TC07 Verify Footer', async ({ page }) => {
        const footer = page.locator('footer');
        await expect(footer).toContainText('2026 megDever0');
    });
});

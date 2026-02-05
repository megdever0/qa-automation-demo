import { Page } from '@playwright/test';

export class ProjectPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('/qa-automation-demo/projects');
    }

    public get getLoginPageButton() {
        return this.page.locator('//button[normalize-space()="Login Page"]');
    }

}
import {expect, type Page, type Locator} from '@playwright/test';

export class Simulator {
    readonly page: Page;
    readonly selectInstructionDropdown: Locator;

    constructor(page: Page) {
        this.page = page;
        this.selectInstructionDropdown = this.page.getByTestId("instruction-loader-button");
    }

    //Actions
    async gotoSimulatorPage() {
        await this.page.goto("/");
    }
    async clickSelectInstructionDropdown() {
        await this.selectInstructionDropdown.click();
    }

    //Assertions
}
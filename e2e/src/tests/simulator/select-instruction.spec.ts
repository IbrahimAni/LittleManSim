import {test} from "../../fixture/base";

test.describe("Select Instruction", () => {
    test("should display a list of instructions when the dropdown is clicked", async ({simulator, page}) => {
        await simulator.gotoSimulatorPage();
        await simulator.clickSelectInstructionDropdown();
        await page.waitForTimeout(2000);

        // await page.goto("/");
    });
});
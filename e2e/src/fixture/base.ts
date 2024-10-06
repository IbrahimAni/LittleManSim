import {test as base} from "@playwright/test";
import { Simulator } from "../pom/SImulator";

type MyFixtures = {
    simulator: Simulator;
};

export const test = base.extend<MyFixtures>({
    simulator: async ({page}, use) => {
        const simulator = new Simulator(page);
        await use(simulator);
    }
});

export { expect } from "@playwright/test";
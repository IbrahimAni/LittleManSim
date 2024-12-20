
import { test, expect } from '@playwright/test';

test.describe('Parser Tests', () => {
  test('Parses valid instruction', async ({ page }) => {
    await page.goto('/');
    await page.fill('#instruction-input', 'ADD 5');
    await page.click('#parse-button');
    const result = page.locator('#parse-result');
    await expect(result).toHaveText('Parsed successfully');
    // ...additional assertions...
  });

  test('Handles invalid instruction', async ({ page }) => {
    await page.goto('/');
    await page.fill('#instruction-input', 'INVALID');
    await page.click('#parse-button');
    const error = page.locator('#error-message');
    await expect(error).toHaveText('Invalid instruction');
    // ...additional assertions...
  });
});
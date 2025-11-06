import { test, expect } from '@playwright/test';

const uniqueSuffix = () => Math.random().toString(36).slice(2, 8);

test.describe('Knowledge Entries', () => {
  test('Add entry (title, description, image) via modal', async ({ page }) => {
    await page.goto('/');

    // Open modal
    await page.getByTestId('add-new-btn').click();
    await expect(page.getByTestId('entry-modal')).toBeVisible();

    // Fill form
    const title = `Test Title ${uniqueSuffix()}`;
    const description = `Test Description ${uniqueSuffix()}`;

    await page.getByTestId('title-input').fill(title);
    await page.getByTestId('description-input').fill(description);

    // Upload image
    await page.getByTestId('image-input').setInputFiles('tests/assets/sample.png');

    // Submit
    await page.getByTestId('submit-btn').click();

    // Modal should close; list should show new card
    await expect(page.getByTestId('entry-modal')).toHaveCount(0);

    // Wait for the card with our title to appear
    const list = page.getByTestId('entries-list');
    await expect(list).toBeVisible();
    await expect(list.getByText(title)).toBeVisible();
    await expect(list.getByText(description)).toBeVisible();
  });

  test('Delete entry from the list', async ({ page }) => {
    await page.goto('/');

    // Create an entry first (through UI) to ensure it exists
    await page.getByTestId('add-new-btn').click();
    await expect(page.getByTestId('entry-modal')).toBeVisible();

    const title = `Delete Me ${uniqueSuffix()}`;
    await page.getByTestId('title-input').fill(title);
    await page.getByTestId('description-input').fill('Temp item to delete');
    await page.getByTestId('image-input').setInputFiles('tests/assets/sample.png');
    await page.getByTestId('submit-btn').click();
    await expect(page.getByTestId('entry-modal')).toHaveCount(0);

    const list = page.getByTestId('entries-list');
    await expect(list.getByText(title)).toBeVisible();

    // Find the specific card and click its delete
    const card = list.getByTestId('entry-card').filter({ hasText: title });
    await card.getByTestId('delete-btn').click();

    // Expect the card to disappear
    await expect(list.getByText(title)).toHaveCount(0);
  });
});

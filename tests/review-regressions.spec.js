import { test, expect } from '@playwright/test';

test('service selection highlights at most five people and restores roster order', async ({ page }) => {
  await page.goto('/#team');
  const cards = page.locator('.team-card');
  const select = page.getByLabel('Explore by service');
  await expect(select).toHaveValue('Full Team');
  await expect(cards.first()).toContainText('Rob Fulcher');
  await expect(page.locator('.team-card.relevant')).toHaveCount(0);
  await expect(select.locator('option')).toHaveCount(16);
  for (const value of await select.locator('option').allTextContents()) {
    if (value === 'Full Team') continue;
    await select.selectOption(value);
    const count = await page.locator('.team-card.relevant').count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThanOrEqual(5);
    await expect(cards.first()).toHaveClass(/relevant/);
  }
  await select.selectOption('Web Design & Development');
  await expect(cards.first()).toContainText('Kylie Wilson');
  await select.selectOption('Full Team');
  await expect(cards.first()).toContainText('Rob Fulcher');
  await expect(page.locator('.team-card.relevant')).toHaveCount(0);
  await expect(page.getByText('+ Compare')).toHaveCount(0);
});

test('service selection works at a touch-sized viewport', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, reducedMotion: 'reduce' });
  try {
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:4179/#team');
    await page.getByLabel('Explore by service').selectOption('Managed IT Services');
    await expect(page.locator('.team-card').first()).toContainText('Travis Durf');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  } finally { await context.close(); }
});

test('city labels appear as the map takes shape, or immediately with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/#about');
  const map = page.locator('.pa-map');
  const city = page.locator('.map-city').first();
  await map.scrollIntoViewIfNeeded();
  await expect(city).toBeHidden();
  await page.waitForTimeout(700);
  await expect(city).toBeHidden();
  await expect(city).toBeVisible({ timeout: 5000 });

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  await expect(city).toBeVisible();
});

test('keyboard users retain the selected city while reaching its map link', async ({ page }) => {
  await page.goto('/#about');
  for (const [city, query] of [
    ['Chambersburg', '760 E Washington St, Chambersburg, PA 17201'],
    ['York', 'York, PA'],
    ['Lancaster', 'Lancaster, PA'],
  ]) {
    const button = page.getByRole('button', { name: city, exact: true });
    await button.focus();
    await page.keyboard.press('Enter');
    const card = page.locator('.location-card');
    await expect(card.getByRole('heading')).toHaveText(`${city}, PA`);
    const link = card.getByRole('link', { name: /Google Maps/ });
    for (let i = 0; i < 6; i++) {
      if (await link.evaluate(el => el === document.activeElement)) break;
      await page.keyboard.press('Tab');
      await expect(card.getByRole('heading')).toHaveText(`${city}, PA`);
    }
    await expect(link).toBeFocused();
    await expect(link).toHaveAttribute('href', `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`);
    await page.keyboard.press('Escape');
    await expect(card).toHaveCount(0);
  }
});

test('discovery objective appears in the summary and survives in-app navigation only', async ({ page }) => {
  await page.goto('/#discover');
  const objective = page.getByLabel('What are you trying to improve?');
  await objective.fill('Reduce support delays');
  await expect(page.locator('.summary')).toContainText('Reduce support delays');
  await page.getByRole('button', { name: 'About', exact: true }).click();
  await page.getByRole('button', { name: /Explore your needs/ }).click();
  await expect(objective).toHaveValue('Reduce support delays');
  await expect(page.locator('.summary')).toContainText('Reduce support delays');
  await objective.fill('');
  await expect(page.locator('.summary')).not.toContainText('Objective:');
  await page.reload();
  await expect(objective).toHaveValue('A smoother way for the team to handle requests.');
});

test('location cards still open on hover and on touch', async ({ page, browser }) => {
  await page.goto('/#about');
  await page.getByRole('button', { name: 'Show York details' }).hover();
  await expect(page.locator('.location-card h3')).toHaveText('York, PA');

  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, reducedMotion: 'reduce' });
  try {
    const mobilePage = await mobile.newPage();
    await mobilePage.goto('http://127.0.0.1:4179/#about');
    await mobilePage.getByRole('button', { name: 'Lancaster', exact: true }).tap();
    await expect(mobilePage.locator('.location-card h3')).toHaveText('Lancaster, PA');
    await mobilePage.getByRole('button', { name: 'Close location details' }).tap();
    await expect(mobilePage.locator('.location-card')).toHaveCount(0);
  } finally {
    await mobile.close();
  }
});

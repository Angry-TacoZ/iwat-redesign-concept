import { test, expect } from '@playwright/test';

test('wheel destinations match iWAT navigation and the node centers meet the ring', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('We Create the Solutions to Your Technology Problems');
  const wheel = page.locator('.wheel');
  for (const node of await page.locator('.wheel .node').all()) {
    const ring = await wheel.boundingBox();
    const circle = await node.boundingBox();
    const dx = (circle.x + circle.width / 2 - (ring.x + ring.width / 2)) / (ring.width / 2);
    const dy = (circle.y + circle.height / 2 - (ring.y + ring.height / 2)) / (ring.height / 2);
    expect(Math.abs(Math.hypot(dx, dy) - 1)).toBeLessThan(.015);
  }
  await expect(page.getByRole('link', { name: /Ask AI/ })).toHaveAttribute('href', 'https://www.iwatllc.com/ai/');
  await expect(page.getByRole('link', { name: /Blog/ })).toHaveAttribute('href', 'https://www.iwatllc.com/blogs/');
  await expect(page.getByRole('link', { name: /Contact Us/ })).toHaveAttribute('href', 'https://www.iwatllc.com/contact/');
  await page.getByRole('button', { name: /Services/ }).click();
  await expect(page).toHaveURL(/#services$/);
  await expect(page.getByRole('link', { name: /Custom Application Development/ })).toHaveAttribute('href', 'https://www.iwatllc.com/application-development/');
  await page.getByRole('button', { name: /Back to the wheel/ }).click();
  await page.getByRole('button', { name: /Solutions/ }).click();
  await expect(page).toHaveURL(/#solutions$/);
  await expect(page.getByRole('heading', { name: 'Application Development' })).toBeVisible();
  await page.getByRole('button', { name: /Back to the wheel/ }).click();
  await page.getByRole('button', { name: /About Us/ }).click();
  await expect(page).toHaveURL(/#about$/);
  await page.getByRole('button', { name: /Meet the team/ }).click();
  await expect(page).toHaveURL(/#team$/);
});

test('phone wheel keeps its six destinations aligned and clear of the message', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, reducedMotion: 'reduce' });
  try {
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:4179/');
    const wheel = await page.locator('.wheel').boundingBox();
    const message = await page.locator('.core-detail p').boundingBox();
    const nodes = page.locator('.wheel .node');
    await expect(nodes).toHaveCount(6);
    for (const node of await nodes.all()) {
      const rect = await node.boundingBox();
      const dx = (rect.x + rect.width / 2 - (wheel.x + wheel.width / 2)) / (wheel.width / 2);
      const dy = (rect.y + rect.height / 2 - (wheel.y + wheel.height / 2)) / (wheel.height / 2);
      expect(Math.abs(Math.hypot(dx, dy) - 1)).toBeLessThan(.015);
      expect(rect.x).toBeGreaterThanOrEqual(0);
      expect(rect.x + rect.width).toBeLessThanOrEqual(390);
      const overlaps = rect.x < message.x + message.width && rect.x + rect.width > message.x && rect.y < message.y + message.height && rect.y + rect.height > message.y;
      expect(overlaps).toBe(false);
    }
  } finally { await context.close(); }
});

const officialRoster = ['Rob Fulcher', 'Dan McCleary', 'James Butts', 'Clint Walker', 'Kylie Wilson', 'Brandon Fulcher', 'Brandon Lamer-Connolly', 'Travis Durf', 'Tanner Wetzel', 'Logan Zeigler', 'Greg Johnston', 'Ethan Fix', 'Kathy Pross', 'Owen Bernecker'];

test('service browsing preserves the official roster and uses documented evidence', async ({ page }) => {
  await page.goto('/#team');
  const cards = page.locator('.team-card');
  const names = cards.locator('strong');
  const select = page.getByLabel('Explore by service');
  await expect(select).toHaveValue('Full Team');
  await expect(names).toHaveText(officialRoster);
  await expect(select.locator('option')).toHaveCount(16);
  const supported = {
    'Custom Application Development': [['Clint Walker', 'https://www.linkedin.com/in/clintjameswalker/']],
    'Web Design & Development': [['Kylie Wilson', 'https://www.linkedin.com/in/kyrwilson/'], ['Clint Walker', 'https://www.linkedin.com/in/clintjameswalker/']]
  };
  for (const value of await select.locator('option').allTextContents()) {
    if (value === 'Full Team') continue;
    await select.selectOption(value);
    expect((await names.allTextContents()).sort()).toEqual([...officialRoster].sort());
    const expected = supported[value] || [];
    const highlighted = page.locator('.team-card.relevant');
    await expect(highlighted).toHaveCount(expected.length);
    expect(expected.length).toBeLessThanOrEqual(5);
    for (let i = 0; i < expected.length; i++) {
      await expect(highlighted.nth(i).locator('strong')).toHaveText(expected[i][0]);
      await expect(highlighted.nth(i).getByRole('link', { name: /Experience source/ })).toHaveAttribute('href', expected[i][1]);
    }
    if (!expected.length) await expect(page.getByText('No individual service connections could be established from available public evidence.')).toBeVisible();
    await expect(page.getByText('Patrick Hicks')).toHaveCount(0);
    await expect(page.getByText('Cameron Leib')).toHaveCount(0);
  }
  await select.selectOption('Full Team');
  await expect(names).toHaveText(officialRoster);
  await expect(page.locator('.team-card.relevant')).toHaveCount(0);
  await expect(page.getByText('INDEPENDENT DESIGN PROTOTYPE · JAMES LANE')).toBeVisible();
});

test('service selection works at a touch-sized viewport', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, reducedMotion: 'reduce' });
  try {
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:4179/#team');
    await page.getByLabel('Explore by service').selectOption('Managed IT Services');
    await expect(page.locator('.team-card')).toHaveCount(14);
    await expect(page.locator('.team-card.relevant')).toHaveCount(0);
    await expect(page.getByText('INDEPENDENT DESIGN PROTOTYPE · JAMES LANE')).toBeVisible();
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
  await page.getByRole('button', { name: /Back to the wheel/ }).click();
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

import { test, expect } from '@playwright/test';

test('Cenário Feliz', async ({ page }) => {
  await page.goto('http://wemovies-qa.s3-website.us-east-2.amazonaws.com/');
  await expect(page).toHaveTitle(/WeMovies/);
});

test('Cenário Triste', async ({ page }) => {
  await page.goto('http://wemovies-qa.s3-website.us-east-2.amazonaws.com/');
  await expect(page).toHaveTitle(/WeMovies/);
});

test('Navegação', async ({ page }) => {
  await page.goto('http://wemovies-qa.s3-website.us-east-2.amazonaws.com/');
  await expect(page).toHaveTitle(/WeMovies/);
});


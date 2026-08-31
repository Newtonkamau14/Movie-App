import { test, expect } from '@playwright/test';
  const BASE_URL = process.env.WEB_URL ?? 'http://localhost:5173';


test('homepage link', async ({ page }) => {
  await page.goto(BASE_URL);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Vite + React + TS");
});



test('should search for movies and render results when clicking search icon', async ({ page }) => {
  await page.goto(BASE_URL);

  // 1. Fill the search input
  const searchInput = page.getByPlaceholder('Search for movies');
  await searchInput.fill('Inception');

  // 2. Click the search icon (img with alt="search")
  await page.getByAltText('search').click();

  // 3. Locate the results container and the first movie card
  const resultsContainer = page.locator('.container');
  const firstMovie = resultsContainer.locator('.movie').first();

  // 4. Assert movie details inside the first result
  await expect(firstMovie).toBeVisible();
  await expect(firstMovie.locator('h3')).toHaveText('Inception');
  await expect(firstMovie.locator('p')).toHaveText('2010');
  await expect(firstMovie.locator('span')).toHaveText('movie');
  
  // 5. Verify image source and alt attributes
  const moviePoster = firstMovie.locator('img');
  await expect(moviePoster).toHaveAttribute('alt', 'Inception');
  await expect(moviePoster).toHaveAttribute('src', /m\.media-amazon\.com/);
});
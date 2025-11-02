import { test, expect } from '@playwright/test';

test('carrinho sem filmes', async ({ page, request }) => {
  await page.goto('http://wemovies-qa.s3-website.us-east-2.amazonaws.com');
  const titulo = page.locator('p', { hasText: 'WeMovies' });
  await expect(titulo).toHaveText('WeMovies');
  const carrinho = page.locator('p.sc-fhHczv.EsNGN');
  await expect(carrinho).toHaveText(/0\s(itens|item)/i);
   const botaoCarrinho = page.locator('div.sc-hjsuWn.eiILXp');
  await botaoCarrinho.click();
  await expect(page).toHaveURL(/\/cart/);
   const mensagemFalha = page.locator('h3', { hasText: 'Parece que não há nada por aqui :(' });
  await expect(mensagemFalha).toBeVisible();
});
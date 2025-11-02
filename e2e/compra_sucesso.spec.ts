import { test, expect } from '@playwright/test';

test('Cenário Feliz', async ({ page, request }) => {
  const response = await request.get('https://wemovies-seven.vercel.app/api/movies');

  expect(response.ok()).toBeTruthy();

  const data = await response.json();

  expect(data).toHaveProperty('products');
  expect(Array.isArray(data.products)).toBe(true);
  expect(data.products.length).toBeGreaterThan(0);

  const primeiroProduto = data.products[0];
  expect(primeiroProduto).toHaveProperty('id');
  expect(primeiroProduto).toHaveProperty('title');
  expect(primeiroProduto).toHaveProperty('price');
  expect(primeiroProduto).toHaveProperty('image');

  expect(primeiroProduto.title).toBe('Viúva Negra');
  expect(primeiroProduto.price).toBe(9.99);
  expect(primeiroProduto.image).toBe('https://wefit-react-web-test.s3.amazonaws.com/viuva-negra.png');
  
  await page.goto('http://wemovies-qa.s3-website.us-east-2.amazonaws.com');
   const titulo = page.locator('p', { hasText: 'WeMovies' });
  await expect(titulo).toHaveText('WeMovies');
   const addcarrinho = page.locator('span', { hasText: /adicionar ao carrinho/i });
  await expect(addcarrinho.nth(0)).toBeVisible();
  await addcarrinho.nth(0).click();
   const botao = page.locator('button.sc-hwkwBN.dPHdbh');
  await expect(botao).toHaveCSS('background-color', 'rgb(3, 155, 0)');
   const carrinho = page.locator('p.sc-fhHczv.EsNGN');
  await expect(carrinho).toHaveText(/1\s(itens|item)/i);
   const botaoCarrinho = page.locator('div.sc-hjsuWn.eiILXp');
  await botaoCarrinho.click();
  await expect(page).toHaveURL(/\/cart/);
   const botaoFinalizar = page.locator('span', { hasText: 'Finalizar pedido' });
  await botaoFinalizar.click();
   const mensagemSucesso = page.locator('h3', { hasText: 'Compra realizada com sucesso!' });
  await expect(mensagemSucesso).toBeVisible();
});


import { test, expect } from '@playwright/test';

test('Cenário Feliz - múltiplos cliques e total', async ({ page, request }) => {
  // Pega os dados da API
  const response = await request.get('https://wemovies-seven.vercel.app/api/movies');
  expect(response.ok()).toBeTruthy();
  const data = await response.json();

  const primeiroProduto = data.products[0];
  expect(primeiroProduto.title).toBe('Viúva Negra');
  expect(primeiroProduto.price).toBe(9.99);

  const quantidadeClicks = 8;

  await page.goto('http://wemovies-qa.s3-website.us-east-2.amazonaws.com');

  const titulo = page.locator('p', { hasText: 'WeMovies' });
  await expect(titulo).toHaveText('WeMovies');

  const addcarrinho = page.locator('span', { hasText: /adicionar ao carrinho/i });
  await expect(addcarrinho.nth(0)).toBeVisible();

  for (let i = 0; i < quantidadeClicks; i++) {
    await addcarrinho.nth(0).click();
  }
  const carrinho = page.locator('p.sc-fhHczv.EsNGN');
  await expect(carrinho).toHaveText(new RegExp(`${quantidadeClicks}\\s(itens|item)`, 'i'));

  const botaoCarrinho = page.locator('div.sc-hjsuWn.eiILXp');
  await botaoCarrinho.click();

  await expect(page).toHaveURL(/\/cart/);

  const totalLocator = page.locator('p.sc-fhHczv.ktmCKx', { hasText: 'R$' });
  const totalText = await totalLocator.textContent();
  if (!totalText) throw new Error('Não foi possível encontrar o total');

  const totalExibido = parseFloat(
    totalText.replace('R$', '').replace(',', '.').trim()
  );

  const somaEsperada = primeiroProduto.price * quantidadeClicks;

  console.log('Total exibido:', totalExibido, 'Total esperado:', somaEsperada);

  expect(totalExibido).toBeCloseTo(somaEsperada, 2);

  const botaoFinalizar = page.locator('span', { hasText: 'Finalizar pedido' });
  await botaoFinalizar.click();

  const mensagemSucesso = page.locator('h3', { hasText: 'Compra realizada com sucesso!' });
  await expect(mensagemSucesso).toBeVisible();
});

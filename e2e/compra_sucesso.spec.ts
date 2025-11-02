import { test, expect, request } from '@playwright/test';
import { TelaInicialPage } from './pages/tela_inicial_h';
import { CarrinhoPage } from './pages/carrinho';
import { API_GET_FILMES } from './const/Api';

test('Cenário Feliz', async ({ page, request }) => {
  // API
  const response = await request.get(API_GET_FILMES);
  expect(response.ok()).toBeTruthy();
  const data = await response.json();
  const primeiroProduto = data.products[0];
  expect(primeiroProduto.title).toBe('Viúva Negra');
  expect(primeiroProduto.price).toBe(9.99);

  // UI
  const telaInicial = new TelaInicialPage(page);
  const carrinho = new CarrinhoPage(page);

  await telaInicial.abrirPagina();
  await telaInicial.validarTitulo();
  await telaInicial.adicionarProdutoAoCarrinho(0);

  await carrinho.validarQtdItens(1);
  await carrinho.irParaCarrinho();
  await carrinho.finalizarCompra();
});

import { test, expect, request } from '@playwright/test';
import { TelaInicialPage } from './pages/tela_inicial_h';
import { CarrinhoPage } from './pages/carrinho';
import { API_GET_FILMES } from './const/Api';

test('Cenário Feliz - múltiplos cliques e total', async ({ page, request }) => {
  const response = await request.get(API_GET_FILMES);
  expect(response.ok()).toBeTruthy();
  const data = await response.json();
  const primeiroProduto = data.products[0];

  const quantidadeClicks = 8;

  const telaInicial = new TelaInicialPage(page);
  const carrinho = new CarrinhoPage(page);

  await telaInicial.abrirPagina();
  await telaInicial.validarTitulo();
  await telaInicial.adicionarProdutoVezes(0, quantidadeClicks);

  await carrinho.validarQtdItens(quantidadeClicks);
  await carrinho.irParaCarrinho();

  const totalExibido = await carrinho.pegarTotal();
  const somaEsperada = primeiroProduto.price * quantidadeClicks;
  expect(totalExibido).toBeCloseTo(somaEsperada, 2);

  await carrinho.finalizarCompra();
});

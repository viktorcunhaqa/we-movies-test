import { test } from '@playwright/test';
import { TelaInicialPage } from './pages/tela_inicial_h';
import { CarrinhoPage } from './pages/carrinho';

test('Carrinho sem filmes', async ({ page }) => {
  const telaInicial = new TelaInicialPage(page);
  const carrinho = new CarrinhoPage(page);

  await telaInicial.abrirPagina();
  await telaInicial.validarTitulo();
  await carrinho.irParaCarrinho();
  await carrinho.validarMensagemFalha();
});

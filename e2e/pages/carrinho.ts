import { Page, Locator, expect } from '@playwright/test';
import { BTN_FINALIZAR_TEXT, MSG_COMPRA_SUCESSO, MSG_CARRINHO_VAZIO } from '../const/constantes';

export class CarrinhoPage {
  readonly page: Page;
  readonly contadorItens: Locator;
  readonly botaoCarrinho: Locator;
  readonly botaoFinalizar: Locator;
  readonly mensagemSucesso: Locator;
  readonly mensagemFalha: Locator;
  readonly total: Locator;

  constructor(page: Page) {
    this.page = page;
    this.contadorItens = page.locator('p.sc-fhHczv.EsNGN');
    this.botaoCarrinho = page.locator('div.sc-hjsuWn.eiILXp');
    this.botaoFinalizar = page.locator('span', { hasText: BTN_FINALIZAR_TEXT });
    this.mensagemSucesso = page.locator('h3', { hasText: MSG_COMPRA_SUCESSO });
    this.mensagemFalha = page.locator('h3', { hasText: MSG_CARRINHO_VAZIO });
    this.total = page.locator('p.sc-fhHczv.ktmCKx', { hasText: 'R$' });
  }

  async validarQtdItens(qtd: number) {
    await expect(this.contadorItens).toHaveText(new RegExp(`${qtd}\\s(itens|item)`, 'i'));
  }

  async irParaCarrinho() {
    await this.botaoCarrinho.click();
    await expect(this.page).toHaveURL(/\/cart/);
  }

  async validarMensagemFalha() {
    await expect(this.mensagemFalha).toBeVisible();
  }

  async finalizarCompra() {
    await this.botaoFinalizar.click();
    await expect(this.mensagemSucesso).toBeVisible();
  }

  async pegarTotal(): Promise<number> {
    const text = await this.total.textContent();
    if (!text) throw new Error('Não foi possível encontrar o total');
    return parseFloat(text.replace('R$', '').replace(',', '.').trim());
  }
}

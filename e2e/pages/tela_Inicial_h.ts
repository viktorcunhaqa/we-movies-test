import { Page, Locator, expect } from '@playwright/test';
import { BASE_URL } from '../const/constantes';

export class TelaInicialPage {
  readonly page: Page;
  readonly titulo: Locator;
  readonly addCarrinhoBtns: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titulo = page.locator('p', { hasText: 'WeMovies' });
    this.addCarrinhoBtns = page.locator('span', { hasText: /adicionar ao carrinho/i });
  }

  async abrirPagina() {
    await this.page.goto(BASE_URL);
  }

  async validarTitulo() {
    await expect(this.titulo).toHaveText('WeMovies');
  }

  async adicionarProdutoAoCarrinho(indice: number = 0) {
    await expect(this.addCarrinhoBtns.nth(indice)).toBeVisible();
    await this.addCarrinhoBtns.nth(indice).click();
  }

  async adicionarProdutoVezes(indice: number = 0, vezes: number) {
    for (let i = 0; i < vezes; i++) {
      await this.adicionarProdutoAoCarrinho(indice);
    }
  }
}

export class BasePage {
  url = '';
  constructor() {}

  async goto(): Promise<void> {
    cy.visit(this.url);
  }
}

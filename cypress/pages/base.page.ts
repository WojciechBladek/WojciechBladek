export class BasePage {
  url = '';
  constructor() {}

  goto(): void {
    cy.visit(this.url);
  }
}

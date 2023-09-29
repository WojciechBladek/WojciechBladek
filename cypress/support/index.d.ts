/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    dataCy(selector: string): Chainable<Element>;
    login(): Cypress.Chainable;
  }
}

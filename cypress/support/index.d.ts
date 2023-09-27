/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    dataCy(selector: string): Chainable<Element>;
    dataCyFind(selector: string): Chainable<Element>;
    after(selector: string): Chainable<Element>;
  }
}

import {validate} from "json-schema";
// @ts-ignore

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      login(): Chainable<JQuery<HTMLElement>>
    }
  }
}


describe('toggle theme', () => {
    it('test toggle theme', () => {
      cy.visit('http://localhost:3000')
      cy.wait(1000)
      cy.get('#theme-toggle').should('exist')
      cy.get('#theme-toggle').click({force: true})
      cy.get('#theme-toggle').click({force: true})
      // cy.get('#theme-toggle').click()

      cy.get('html').should('have.class', 'light')
      cy.wait(1000)
      cy.get('#theme-toggle').click({force: true})
      cy.get('html').should('have.class', 'dark')
                // cy.get('#theme-toggle').click()
        // cy.get('html').should('not.have.class', 'dark')
    })

})

describe('home page spec', () => {

  it('test home page', () => {
    cy.visit('http://localhost:3000')
    cy.get('#welcome-message')
        .should('exist')
        .should('have.text', 'Welcome to Quan 的 Blog 順便當作 Dcard 2024 實習 Intern Demo power by Github Issue')
  })

  it('test scroll to load more', () => {
    cy.visit('http://localhost:3000')
    for(let i = 0; i < 3; i++) {
      cy.get('#blog-list-footer')
          .should('exist')
          .scrollIntoView()
          .wait(1000)
    }
    cy.get('#blog-list-footer').should('have.text', 'No more issues')
  })

})
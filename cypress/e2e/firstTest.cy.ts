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

Cypress.Commands.add('login', () => {
  cy.session('github', () => {
    cy.visit('http://localhost:3000')
    // get oauth button
    const button = cy.get('#oauth-button')
    button.should('exist')

    // submit gitHub login form
    button.click()

    cy.origin('https://github.com', () => {
      cy.get('#login_field').type('quan0715')
      cy.get('#password').type('H125920690quan')
      cy.get('input[name="commit"]').click()

    })
  }, {
    validate: () => {
      const token = cy.getCookie('access_token').should('exist')
      console.log('token', token)

      // check user avatar exist
      cy.get('#user-avatar').should('exist')
    }
  })
})

describe('home page spec', () => {

  it('test home page', () => {
    cy.visit('http://localhost:3000')
    cy.get('#welcome-message')
        .should('exist')
        .should('have.text', 'Welcome to Quan 的 Blog 順便當作 Dcard 2024 實習 Intern Demo power by Github Issue')
  })

  // it('get oauth button', () => {
  //   // cy.login()
  //   cy.visit('http://localhost:3000')
  //   // get oauth button
  //   const button = cy.get('#oauth-button')
  //   button.should('exist')
  //
  //   // submit gitHub login form
  //   // button.click()
  //
  //   cy.origin('https://github.com', () => {
  //     cy.get('#login_field').type('quan0715')
  //     cy.get('#password').type('H125920690quan')
  //     cy.get('input[name="commit"]').click()
  //
  //     cy.log('submit login form')
  //
  //   })
  //
  //   const token = cy.getCookie('access_token').should('exist')
  //   console.log('token', token)
  //
  //   // check user avatar exist
  //   cy.get('#user-avatar').should('exist')
  // })
})
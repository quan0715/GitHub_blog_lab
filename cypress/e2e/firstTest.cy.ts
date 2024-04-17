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
    cy.get('#blog-list-footer').should('exist')
    cy.scrollTo('bottom')
    cy.wait(3000)
    cy.get('#blog-list-footer').should('exist')
    cy.scrollTo('bottom')
    cy.wait(3000)
    cy.get('#blog-list-footer').should('exist')
    cy.scrollTo('bottom')
    cy.wait(3000)
    //
    // cy.get('#blog-list-footer').scrollIntoView()
    // cy.wait(1000)
    cy.get('#blog-list-footer').should('have.text', 'No more issues')
  })

  // it('test home page with user', () => {
  //   cy.login()
  // })

  it('get oauth button', () => {
    // cy.login()
    cy.visit('http://localhost:3000')
    // get oauth button
    const button = cy.get('#oauth-button')
    button.should('exist')

    // submit gitHub login form
    // button.click()

    // cy.origin('https://github.com', () => {
    //   cy.get('#login_field').type('quan0715')
    //   cy.get('#password').type('H125920690quan')
    //   cy.get('input[name="commit"]').click()
    //
    //   cy.log('submit login form')
    //
    // })


    // cy.log(process.env.GTHUB_ACCESS_TOKEN as string)

    cy.wait(1000)
        .setCookie('access_token', 'ghu_BRgRe8qlyKyOkO48BFA9bN3m8xUOhy2Kdodg')
        .reload()

    const token = cy.getCookie('access_token').should('exist')
    console.log('token', token)

    // check user avatar exist
    cy.get('#user-avatar').should('exist')
  })
})
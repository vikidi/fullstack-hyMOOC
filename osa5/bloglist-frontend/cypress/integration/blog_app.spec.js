describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.createUser({ username: 'test', name: 'Test User', password: 'test_pass' })
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.get('#loginButton')
      .should('contain', 'login')
  })

  describe('Login',function() {
    it('Succeeds with correct credentials', function() {
      cy.get('#username').type('test')
      cy.get('#password').type('test_pass')
      cy.get('#loginButton').click()

      cy.contains('Test User is logged in')
    })

    it('Fails with wrong credentials', function() {
      cy.get('#username').type('test')
      cy.get('#password').type('wrong')
      cy.get('#loginButton').click()

      cy.get('.error')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Test User is logged in')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'test', password: 'test_pass' })
    })

    it('A blog can be created', function() {
      cy.contains('Create new').click()

      cy.get('#title').type('Test Blog Title')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('Test url')
      cy.get('#createButton').click()

      cy.contains('Test Blog Title Test Author')
    })
  })
})
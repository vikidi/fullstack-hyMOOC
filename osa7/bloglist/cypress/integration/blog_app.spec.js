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

  describe('When logged in', function() {
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

    describe('and a blog is created', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'Test Blog Title',
          author: 'Test Author',
          url: 'Test url'
        })
      })

      it('A blog can be liked', function() {
        cy.contains('Test Blog Title Test Author').as('theBlog')

        cy.get('@theBlog')
          .contains('view')
          .click()

        cy.get('@theBlog')
          .should('contain', 'likes 0')

        cy.get('@theBlog')
          .contains('like')
          .click()

        cy.get('@theBlog')
          .should('contain', 'likes 1')
      })

      it('A blog can be removed', function() {
        cy.contains('Test Blog Title Test Author').as('theBlog')

        cy.get('@theBlog')
          .contains('view')
          .click()

        cy.get('@theBlog')
          .contains('remove')
          .click()

        cy.get('html')
          .should('not.contain', 'Test Blog Title Test Author')
      })

      it('Blogs are sorted by likes', function() {
        const blogsToBeAdded = [
          {
            title: 'First blog',
            author: 'First Author',
            url: 'First url',
            likes: 5
          },
          {
            title: 'Second blog',
            author: 'Second Author',
            url: 'Second url',
            likes: 2
          }
        ]

        for (let blog of blogsToBeAdded) {
          cy.createBlog({ title: blog.title, author: blog.author, url: blog.url, likes: blog.likes })
        }

        cy.get('.blog')
          .then(blogs => {

            let counter = 0
            for (let blog of blogs) {
              cy.wrap(blog)
                .contains('view')
                .click()

              if (counter !== 0) { // Don't check at the first one
                cy.get('.likes')
                  .eq(-2) // Get the second last
                  .invoke('text')
                  .then(parseFloat)
                  .then(($prev) => {
                    cy.get('.likes:last')
                      .invoke('text')
                      .then(parseFloat)
                      .should('be.lt', $prev + 1)
                  })
              }

              ++counter
            }
          })
      })
    })
  })
})
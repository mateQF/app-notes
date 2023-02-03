describe('Note app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')

    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      "userName": "MatQF",
      "name": "Mateo",
      "passwordHash": "password"
    }

    cy.request('POST', 'http://localhost:3001/api/users', user)
  })

  it('frontpage can be opened', () => {
    cy.contains('NOTES APP')
  })

  it('login form can be opened', () => {
    cy.contains('Go login!').click()
  })

  it('user can login', () => {
    cy.contains('Go login!').click()
    cy.get('input:first').type('MatQF')
    cy.get('input:last').type('password')
    cy.get('#form-login-button').click()
    cy.get('#logout-button')
  })

  it('login fails with wrong credentials', () => {
    cy.contains('Go login!').click()
    cy.get('input:first').type('MatQF')
    cy.get('input:last').type('incorrect-password')
    cy.get('#form-login-button').click()

    cy.get('.error span')
      .should('contain', 'Wrong credentials')
      .should('have.css', 'color', 'rgb(255, 0, 0)')
  })
  
  describe.only('when user logged in', () => {
    beforeEach(() => {
      cy.login({ userName: 'MatQF', passwordHash: 'password' })
    })
  
    it('a new note can be created', () => {
      const noteContent = 'Creating a note from cypress test'
      cy.contains('Add a note').click()
      cy.get('[placeholder="Note content"]').type(noteContent)
      cy.contains('Create note').click()
      cy.contains(noteContent)
    })

    describe('and a note exists', () => {
      beforeEach(() => {
        cy.request({
          method: 'POST',
          url: 'http://localhost:3001/api/notes',
          body: { content: 'A note created from cypress', important: false},
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('loggedNoteAppUser')).token}`
          }
        })
        cy.visit('http://localhost:3001')
      })
    })
  })
})

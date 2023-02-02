describe('Note app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
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
  
  describe('when user logged in', () => {
    beforeEach(() => {
      cy.contains('Go login!').click()
      cy.get('input:first').type('MatQF')
      cy.get('input:last').type('password')
      cy.get('#form-login-button').click()
      cy.contains('Add a note').click()
    })
  
    it('a new note can be created', () => {
      const noteContent = 'Creating a note from cypress test'
      cy.get('[placeholder="Note content"]').type(noteContent)
      cy.contains('Create note').click()
      cy.contains(noteContent)
    })
  })
})

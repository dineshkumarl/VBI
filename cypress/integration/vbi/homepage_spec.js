
context("Home page",()=>{
  
  describe('Search box should - ', () => {
      it('give search result on typing', () => {
        cy.visit('http://localhost:3001')
  
        cy.get('#songSearch')
        .type('Mo')
        .should('have.value', 'Mo')

        cy.get('[data-title]')
        .first()
        .invoke('text')
        .should('match', /^Mo/)
      })
    })

  describe('Menu should - ', ()=>{
     it("have login button", ()=>{
       cy.visit('http://localhost:3001')       
       cy.get('#menu-button-vbi-menu').should('have.length', 1)
     })

     it("navigate to login page on clicking the login button", ()=>{
      cy.visit('http://localhost:3001')
      
      cy.get('#menu-button-vbi-menu').click()

      cy.get('.loginButton')
      .first()
      .click();

      cy.location().should((location)=>{
        expect(location.pathname).to.eq('/login')
      })
     })

  })
})
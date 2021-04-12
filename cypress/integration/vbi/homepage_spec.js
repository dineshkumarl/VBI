
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
     })
  })
})
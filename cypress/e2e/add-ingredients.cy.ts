describe('add ingredients', function() {
    it('add ingredients to constructor', function() {
        cy.visit('http://localhost:3000');
        cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' })


        cy.get('[data-testid="total-price"]').invoke('text').should('equal', '0');

        cy.get('[data-testid="ingredient-card"]').contains('Котлета 1').trigger('dragstart');
        cy.get('[data-testid="burger-constructor"]').trigger('drop');

        cy.get('[data-testid="ingredient-card"]').contains('Булка 1').trigger('dragstart');
        cy.get('[data-testid="burger-constructor"]').trigger('drop');

        cy.get('[data-testid="total-price"]').invoke('text').should('not.equal', '0');
    });

});



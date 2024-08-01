describe('modal', function() {
    it('open modal details ingredient', function() {
        cy.visit('http://localhost:3000');
        cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' })

        cy.get('[data-testid="ingredient-card"]').contains('Котлета 1').click();

        cy.get('[data-testid="ingredient-details-title"]').contains('Котлета 1');
    });

    it('close modal - click on close button', function() {
        cy.visit('http://localhost:3000');
        cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' })

        cy.get('[data-testid="ingredient-card"]').contains('Котлета 1').click();

        cy.get('[data-testid="close-button-modal"]').click()

        cy.get('[data-testid="ingredient-details-title"]').should('not.exist');
    });

    it('close modal - click on overlay', function() {
        cy.visit('http://localhost:3000');
        cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' })

        cy.get('[data-testid="ingredient-card"]').contains('Котлета 1').click();

        cy.get('[data-testid="overlay-modal"]').click(1, 1)

        cy.get('[data-testid="ingredient-details-title"]').should('not.exist');
    });
});
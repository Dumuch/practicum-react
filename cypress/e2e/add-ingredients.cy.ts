import {BURGER_CONSTRUCTOR_SELECTOR, INGREDIENT_CARD_SELECTOR, TOTAL_PRICE_SELECTOR} from "../constants";

describe('add ingredients', function() {
    it('add ingredients to constructor', function() {
        cy.runApp();

        cy.get(TOTAL_PRICE_SELECTOR).as(TOTAL_PRICE_SELECTOR).invoke('text').should('equal', '0');

        cy.get(INGREDIENT_CARD_SELECTOR).contains('Котлета 1').trigger('dragstart');
        cy.get(BURGER_CONSTRUCTOR_SELECTOR).as(BURGER_CONSTRUCTOR_SELECTOR).trigger('drop');

        cy.get(INGREDIENT_CARD_SELECTOR).contains('Булка 1').trigger('dragstart');
        cy.get('@' + BURGER_CONSTRUCTOR_SELECTOR).trigger('drop');

        cy.get('@' + TOTAL_PRICE_SELECTOR).invoke('text').should('not.equal', '0');
    });

});



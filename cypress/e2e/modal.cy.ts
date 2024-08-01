import {
    CLOSE_BUTTON_MODAL_SELECTOR,
    INGREDIENT_DETAILS_TITLE_SELECTOR,
    OVERLAY_MODAL_SELECTOR
} from "../constants";

describe('modal', function () {
    it('open modal details ingredient', function () {
        cy.runApp();
        cy.openIngredientDetails();

        cy.get(INGREDIENT_DETAILS_TITLE_SELECTOR).contains('Котлета 1');
    });

    it('close modal - click on close button', function () {
        cy.runApp();
        cy.openIngredientDetails();

        cy.get(CLOSE_BUTTON_MODAL_SELECTOR).click()
        cy.get(INGREDIENT_DETAILS_TITLE_SELECTOR).should('not.exist');
    });

    it('close modal - click on overlay', function () {
        cy.runApp();
        cy.openIngredientDetails();

        cy.get(OVERLAY_MODAL_SELECTOR).click(1, 1)
        cy.get(INGREDIENT_DETAILS_TITLE_SELECTOR).should('not.exist');
    });
});
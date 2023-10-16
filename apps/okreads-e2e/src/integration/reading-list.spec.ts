describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  it('Then: I should add book to reading list and undo my action', () => {
    let countOfElements;

    cy.get('input[type="search"]').type('javascript');
    cy.get('form').submit();
    cy.wait(2000);

    cy.get('[aria-label="Want to Read"]').as('addBookButton');
    cy.get('@addBookButton').eq(1).click({ force: true });
    cy.get('@addBookButton').eq(1).should('be.disabled');
    cy.get('@addBookButton').eq(2).click({ force: true });
    cy.get('@addBookButton').eq(2).should('be.disabled');

    cy.get('[data-testing="toggle-reading-list"]').click({ force: true });
    cy.wait(100);

    cy.get('.reading-list-container')
      .find('.reading-list-item')
      .then((value) => {
        countOfElements = Cypress.$(value).length;

        cy.get('.reading-list-container')
          .find('.reading-list-item')
          .as('readList');

        cy.get('@readList').should('have.length', countOfElements);
        cy.get('[aria-label="Close"]').click({ force: true });
        cy.get('.mat-simple-snackbar')
          .should('contain.text', 'Added')
          .parent()
          .within(() => {
            cy.get('.mat-button').click();
          });

        cy.get('@addBookButton').eq(2).should('not.be.disabled');
        cy.get('[data-testing="toggle-reading-list"]').click({ force: true });
        cy.wait(100);
        cy.get('@readList').should('have.length', countOfElements - 1);
      });
  });

  it('Then: I should remove book from reading list and undo my action', () => {
    let countOfElements;

    cy.get('input[type="search"]').type('javascript');
    cy.get('form').submit();
    cy.wait(2000);

    cy.get('[aria-label="Want to Read"]').as('addBookButton');
    cy.get('@addBookButton').eq(3).click({ force: true });
    cy.get('@addBookButton').eq(3).should('be.disabled');
    cy.get('@addBookButton').eq(4).click({ force: true });
    cy.get('@addBookButton').eq(4).should('be.disabled');

    cy.get('[data-testing="toggle-reading-list"]').click({ force: true });
    cy.wait(100);

    cy.get('.reading-list-container')
      .find('.reading-list-item')
      .then((value) => {
        countOfElements = Cypress.$(value).length;
        cy.get('.reading-list-container')
          .find('.reading-list-item')
          .as('readList');
        cy.get('@readList').should('have.length', countOfElements);
        cy.get('[data-testing="remove-book"]').eq(0).click({ force: true });
        cy.get('@readList').should('have.length', countOfElements - 1);
        cy.wait(100);
        cy.get('.mat-simple-snackbar')
          .should('contain.text', 'Removed')
          .parent()
          .within(() => {
            cy.get('.mat-button').click();
          });
        cy.get('@readList').should('have.length', countOfElements);
      });
  });
});

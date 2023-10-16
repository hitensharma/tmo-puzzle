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

  it('Then: I should see my finished list', () => {
    cy.get('input[type="search"]').type('javascript');
    cy.get('form').submit();
    cy.wait(2000);

    cy.get('[aria-label="Want to Read"]').as('addBookButton');
    cy.get('@addBookButton').eq(1).click({ force: true });
    cy.wait(100);
    cy.get('[aria-label="Finish"]').as('finishButton');
    cy.get('@finishButton').eq(1).should('contain.text', 'Finish');
    cy.get('@addBookButton').eq(2).click({ force: true });
    cy.get('@finishButton').eq(2).should('contain.text', 'Finish');

    cy.get('[data-testing="toggle-reading-list"]').click({ force: true });
    cy.wait(100);
    cy.get('[data-testing="finish-book"]').eq(0).click({ force: true });
    cy.get('.finished-text').should('contain.text', 'Finished');
  });
});

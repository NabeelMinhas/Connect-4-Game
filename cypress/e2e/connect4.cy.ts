describe('Connect 4 Game', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
    cy.get('button').contains('Play with Human').click();

    cy.get('input[name="playerOne"]').type('Player 1');
    cy.get('input[name="playerTwo"]').type('Player 2');
    cy.get('input[type="submit"]').click();
  });

  it('should allow players to enter their names and start the game', () => {
    cy.contains("Player 1's Turn").should('be.visible');
  });

  it('should allow players to make moves by clicking on columns', () => {
    cy.get('[id="0"]').click();
    cy.get('[data-testid="cell-5-0"]').should('have.class', 'bg-blue-500');
    
    cy.get('[id="0"]').click();
    cy.get('[data-testid="cell-4-0"]').should('have.class', 'bg-red-500');
  });

  it('should display a win message when a player wins', () => {
    cy.get('[id="0"]').click(); // Player 1
    cy.get('[id="1"]').click(); // Player 2
    cy.get('[id="0"]').click(); // Player 1
    cy.get('[id="1"]').click(); // Player 2
    cy.get('[id="0"]').click(); // Player 1
    cy.get('[id="1"]').click(); // Player 2
    cy.get('[id="0"]').click(); // Player 1 (Winning Move)

    cy.contains("Player 1 Won").should('be.visible');
  });

  it('should allow players to reset the game after it ends', () => {
    cy.get('[id="0"]').click(); // Player 1
    cy.get('[id="1"]').click(); // Player 2
    cy.get('[id="0"]').click(); // Player 1
    cy.get('[id="1"]').click(); // Player 2
    cy.get('[id="0"]').click(); // Player 1
    cy.get('[id="1"]').click(); // Player 2
    cy.get('[id="0"]').click(); // Player 1 (Winning Move)

    cy.contains("Player 1 Won").should('be.visible');

    cy.contains('Reset Game').click();
    cy.get('button').contains('Play with Human').click();

    cy.get('[data-testid="cell-0-0"]').should('have.class', 'bg-white');
  });

  it('should display the correct player turn after each move', () => {
    cy.get('[id="0"]').click();
    cy.contains("Player 2's Turn").should('be.visible');

    cy.get('[id="0"]').click();
    cy.contains("Player 1's Turn").should('be.visible');
  });
});

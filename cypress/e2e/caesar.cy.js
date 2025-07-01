describe('Caesar Cipher Component', () => {
    beforeEach(() => {
        // Visiter la page avant chaque test
        cy.visit('../../Pages/caesar/index.html');
    });

    it('Automatiser la complétion du formulaire', () => {
        // Remplir le champ texte
        cy.get('#text').type('HELLO');
        // Remplir le champ décalage
        cy.get('#shift').type('3');
        // Vérifier que les champs contiennent les bonnes valeurs
        cy.get('#text').should('have.value', 'HELLO');
        cy.get('#shift').should('have.value', '3');
    });

    it('Automatiser la validation du formulaire', () => {
        // Remplir le formulaire
        cy.get('#text').type('HELLO');
        cy.get('#shift').type('3');
        // Soumettre le formulaire
        cy.get('button[type="submit"]').click();
        // Vérifier que le résultat est affiché
        cy.get('#result').should('not.be.empty');
    });

    it('Vérifier l\'affichage du bon résultat', () => {
        // Remplir le formulaire avec un texte et un décalage
        cy.get('#text').type('HELLO');
        cy.get('#shift').type('3');
        // Soumettre le formulaire
        cy.get('button[type="submit"]').click();
        // Vérifier que le résultat est correct (HELLO + 3 = KHOOR)
        cy.get('#result').should('have.text', 'Résultat : KHOOR');
    });
});
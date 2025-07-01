/// <reference types="cypress" />

context('Homepage', () => {
    beforeEach(() => {
        // Visit the main page
        cy.visit('../../Pages/index.html');
    });

    it('should have a paragraph with hello world', () => {
        // Verify the paragraph text
        cy.get('p').contains('Hello world !');
    });

    it('should open the lightbox when clicking the image', () => {
        cy.get('.relative.w-64.cursor-pointer').click();
        cy.get('.fixed.top-0.left-0').should('be.visible');
    });

    it('should close the lightbox when clicking outside', () => {
        cy.get('.relative.w-64.cursor-pointer').click();
        cy.get('.fixed.top-0.left-0').should('be.visible');
        cy.get('.fixed.top-0.left-0').click('topLeft', {force: true}); // Click outside, force due to potential overlap
        cy.get('.fixed.top-0.left-0').should('not.be.visible');
    });

    it('should add a "like" and update counters on overlay and lightbox', () => {
        // Check initial like count
        cy.get('.relative.w-64.cursor-pointer').trigger('mouseover');
        cy.get('.text-sm.text-white[x-text="likesCount"]').should('have.text', '0');
        cy.get('.relative.w-64.cursor-pointer').click();
        cy.get('.text-xs.font-semibold[x-text="likesCount"]').should('have.text', '0');

        // Click the like button
        cy.get('svg[title="Like"]').click();

        // Verify updated counts
        cy.get('.fixed.top-0.left-0').click('topLeft', {force: true}); // Close lightbox
        cy.get('.relative.w-64.cursor-pointer').trigger('mouseover');
        cy.get('.text-sm.text-white[x-text="likesCount"]').should('have.text', '1');
        cy.get('.text-xs.font-semibold[x-text="likesCount"]').should('have.text', '1');
    });

    it('should remove a "like" and update counters on overlay and lightbox', () => {
        // Add a like first
        cy.get('.relative.w-64.cursor-pointer').click();
        cy.get('svg[title="Like"]').click();
        cy.get('.text-xs.font-semibold[x-text="likesCount"]').should('have.text', '1');
        cy.get('.fixed.top-0.left-0').click('topLeft', {force: true}); // Close lightbox
        cy.get('.relative.w-64.cursor-pointer').trigger('mouseover');
        cy.get('.text-sm.text-white[x-text="likesCount"]').should('have.text', '1');

        // Remove the like
        cy.get('.relative.w-64.cursor-pointer').click();
        cy.get('svg[title="Dislike"]').click();

        // Verify updated counts
        cy.get('.text-xs.font-semibold[x-text="likesCount"]').should('have.text', '0');
        cy.get('.fixed.top-0.left-0').click('topLeft', {force: true}); // Close lightbox
        cy.get('.relative.w-64.cursor-pointer').trigger('mouseover');
        cy.get('.text-sm.text-white[x-text="likesCount"]').should('have.text', '0');
    });

    it('should add a comment with text "Cypress is awesome!"', () => {
        cy.get('.relative.w-64.cursor-pointer').click();
        cy.get('input[name="comment"]').type('Cypress is awesome!');
        cy.get('button[type="submit"]').should('not.be.disabled').click();
        cy.get('.text-black.text-xs[x-text="comment.body"]').contains('Cypress is awesome!').should('be.visible');
    });

    it('should disable the "Publish" button when the comment input is empty', () => {
        cy.get('.relative.w-64.cursor-pointer').click();
        cy.get('input[name="comment"]').should('have.value', '');
        cy.get('button[type="submit"]').should('be.disabled');
    });

    it('should toggle the visibility of comments when clicking the hide comments option', () => {
        // Add a comment to ensure there are comments to hide
        cy.get('.relative.w-64.cursor-pointer').click();
        cy.get('input[name="comment"]').type('Test comment');
        cy.get('button[type="submit"]').click();
        cy.get('.text-black.text-xs[x-text = "comment.body"]').should('be.visible');

        // Toggle hide comments
        cy.get('.text-xs.text-gray-400[x-text="displayCommentText()"]').contains('Hide 1 comment').click();
        cy.get('.bg-white.flex.flex-col[x-show="isCommentsVisible"]').should('not.be.visible');

        // Toggle show comments
        cy.get('.text-xs.text-gray-400[x-text="displayCommentText()"]').contains('Show 1 comment').click();
        cy.get('.bg-white.flex.flex-col[x-show="isCommentsVisible"]').should('be.visible');
    });

    it('should update comment counters on overlay and lightbox', () => {
        // Check initial comment count
        cy.get('.relative.w-64.cursor-pointer').trigger('mouseover');
        cy.get('.text-sm.text-white[x-text="commentsCount()"]').should('have.text', '0');
        cy.get('.relative.w-64.cursor-pointer').click();
        cy.get('.text-xs.text-gray-400[x-text="displayCommentText()"]').should('not.be.visible'); // No comments yet

        // Add a comment
        cy.get('input[name="comment"]').type('Test comment');
        cy.get('button[type="submit"]').click();

        // Verify updated counts
        cy.get('.text-xs.text-gray-400[x-text="displayCommentText()"]').should('contain.text', '1 comment');
        cy.get('.fixed.top-0.left-0').click('topLeft', {force: true}); // Close lightbox
        cy.get('.relative.w-64.cursor-pointer').trigger('mouseover');
        cy.get('.text-sm.text-white[x-text="commentsCount()"]').should('have.text', '1');
    });

    it('should display singular/plural correctly based on comment count', () => {
        // Check initial comment count (0 comments)
        cy.get('.relative.w-64.cursor-pointer').trigger('mouseover');
        cy.get('.text-sm.text-white[x-text="commentsCount()"]').should('have.text', '0');
        cy.get('.relative.w-64.cursor-pointer').click();
        cy.get('.text-xs.text-gray-400[x-text="displayCommentText()"]').should('not.be.visible'); // No comments yet

        // Add one comment
        cy.get('input[name="comment"]').type('First comment');
        cy.get('button[type="submit"]').click();
        cy.get('.text-xs.text-gray-400[x-text="displayCommentText()"]').should('contain.text', '1 comment');

        // Add another comment
        cy.get('input[name="comment"]').type('Second comment');
        cy.get('button[type="submit"]').click();
        cy.get('.text-xs.text-gray-400[x-text="displayCommentText()"]').should('contain.text', '2 comments');

        // Verify overlay count
        cy.get('.fixed.top-0.left-0').click('topLeft', {force: true}); // Close lightbox
        cy.get('.relative.w-64.cursor-pointer').trigger('mouseover');
        cy.get('.text-sm.text-white[x-text="commentsCount()"]').should('have.text', '2');
    });

    it('should write three comments and delete the second one', () => {
        cy.get('.relative.w-64.cursor-pointer').click();

        // Add three comments
        const comments = ['First comment', 'Second comment', 'Third comment'];
        comments.forEach(comment => {
            cy.get('input[name="comment"]').type(comment);
            cy.get('button[type="submit"]').click();
        });

        // Verify all comments are present
        cy.get('.text-black.text-xs[x-text="comment.body"]').should('have.length', 3);
        cy.get('.text-black.text-xs[x-text="comment.body"]').eq(1).contains('Second comment').should('be.visible');

        // Delete the second comment
        cy.get('.h-2.w-2.fill-current[title="Supprimer le commentaire"]').eq(1).click();

        // Verify the second comment is removed and counts are updated
        cy.get('.text-black.text-xs[x-text="comment.body"]').should('have.length', 2);
        cy.get('.text-black.text-xs[x-text="comment.body"]').contains('Second comment').should('not.exist');
        cy.get('.text-xs.text-gray-400[x-text="displayCommentText()"]').should('contain.text', '2 comments');
        cy.get('.fixed.top-0.left-0').click('topLeft', {force: true}); // Close lightbox
        cy.get('.relative.w-64.cursor-pointer').trigger('mouseover');
        cy.get('.text-sm.text-white[x-text="commentsCount()"]').should('have.text', '2');
    });
});
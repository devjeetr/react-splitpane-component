describe("basic sanity tests", () => {
    beforeEach(() => {
        cy.visit("localhost:8080");
    })


    it("horizontal splitpane resizes to the left", () => {
        cy.get(".simple-case .split-pane-handle")
          .trigger("mousedown", { which: 1})
          .trigger("mousemove", { clientX: 50})
          .trigger("mouseup", {force: true})
        cy.get(".split-pane-first-pane")
        .invoke('outerWidth').should('be.lt', 50);
    })

    it("horizontal splitpane resizes to the right", () => {
      const viewportWidth = Cypress.config().viewportWidth;
      cy.get(".simple-case .split-pane-handle")
        .trigger("mousedown", { which: 1})
        .trigger("mousemove", { clientX: viewportWidth/2  + 50})
        .trigger("mouseup", {force: true})

      cy.get(".split-pane-first-pane")
      .invoke('outerWidth').should('be.lt', viewportWidth/2  + 50);
  })

    it("splitpane resizes with resize to outside browser window", () => {
      cy.get(".simple-case .split-pane-handle")
        .trigger("mousedown", { which: 1})
        .trigger("mousemove", { clientX: -50})
        .trigger("mouseup", {force: true})
      cy.get(".simple-case")
      .get(".split-pane-first-pane")
      .invoke('outerWidth').should('be.lt', 1);
  })

  it("nested(horizonal-splitpane > horizontal-splitpane) splitpane resizes to the left", () => {
   
    cy.get(".nested-case>.split-pane-root>.split-pane-second-pane>.split-pane-root>.split-pane-handle")
      .trigger("mousedown", { which: 1})
      .trigger("mousemove", { clientX: -50})
      .trigger("mouseup", {force: true})

      cy.get(".nested-case>.split-pane-root>.split-pane-second-pane>.split-pane-root>.split-pane-first-pane")
        .invoke('outerWidth').should('be.lt', 1);
  })


})
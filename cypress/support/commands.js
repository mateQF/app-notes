Cypress.Commands.add("login", ({ userName, passwordHash }) => {
  cy.request("POST", "http://localhost:3001/api/login", {
    userName,
    passwordHash
  }).then((res) => {
    localStorage.setItem("loggedNoteAppUser", JSON.stringify(res.body));
    cy.visit("http://localhost:3000");
  });
});

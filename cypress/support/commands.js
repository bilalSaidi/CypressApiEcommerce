import validators from '../fixtures/schemas/SchemaSetup';

/**
 * Validates a response body against a pre-compiled ajv JSON schema.
 * Looks up the compiled validator by name from `validators` (see SchemaSetup.js),
 * asserts the data matches the schema, and yields the original data so the
 * command can be chained with `.then()` like any other Cypress command.
 *
 * @param {string} schemaName - Key of the schema in `validators` (e.g. 'userResponse').
 * @param {object} data - The response body (or any object) to validate.
 */
Cypress.Commands.add('validateSchema', (schemaName, data) => {
  const validate = validators[schemaName];
  const valid = validate(data);
  expect(valid, JSON.stringify(validate.errors)).to.be.true;
  return cy.wrap(data, { log: false });
});

/**
 * Logs in as the admin user configured via the `AdminEmail`/`AdminPassword`
 * Cypress environment variables, validates the login response against the
 * `tokenResponse` schema, and yields the bearer access token so tests can
 * reuse it for authenticated requests.
 */
Cypress.Commands.add('login', () => {
    cy.env(['AdminEmail', 'AdminPassword']).then(({ AdminEmail, AdminPassword }) => {
        cy.request({
        method: 'POST',
        url: '/users/login',
        body: {
            email: AdminEmail,
            password: AdminPassword
        }
        })
        .then((response) => {
        expect(response.status).to.eq(200);
        return cy.validateSchema('tokenResponse', response.body).then(() => response.body.access_token);
        });
    });
 })
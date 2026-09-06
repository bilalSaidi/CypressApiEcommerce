/// <reference types="cypress" />
const { newUser, updatedUser } = require('../fixtures/user');
import { findUserOnPage } from '../support/helperFunctions';
let AdminToken = '';
let userId = '';


context("Given A Random User Trying To Access Users Endpoint", () => {
    it("Should Get Unauthorized Response", () => {
      cy.request({
        method: 'GET',
        url: '/users',
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401);
        cy.validateSchema('unauthorizedResponse', response.body);
        console.log(response.body);
      });
    }); 
});

describe("Given A logged in admin User", () => {
  before(() => {
    cy.login().then((token) => {
      AdminToken = token;
    });
  });

  after(() => {
    if (!userId) {
      return;
    }

    cy.request({
      method: 'DELETE',
      url: `/users/${userId}`,
      headers: {
        Authorization: `Bearer ${AdminToken}`
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(204);
      expect(response.body).to.be.empty;
      cy.log(`User ${userId} deleted successfully`);

      cy.request({
        method: 'GET',
        url: `/users/${userId}`,
        headers: {
          Authorization: `Bearer ${AdminToken}`
        },
        failOnStatusCode: false
      }).then((getResponse) => {
        expect(getResponse.status).to.eq(404);
        expect(getResponse.body.message).to.eq('Requested item not found');
        cy.validateSchema('itemNotFoundResponse', getResponse.body);
        cy.log(`Confirmed user ${userId} was not found after deletion`);
      });
    });
  });

  it("should create a new user", () => {
    cy.request({
      method: 'POST',
      url: '/users/register',
      headers: {
        Authorization: `Bearer ${AdminToken}`
      },
      body: newUser
    }).then((response) => {
      console.log(newUser);
      expect(response.status).to.eq(201);
      cy.validateSchema('userResponse', response.body);
      console.log(response.body);
    });
  });

  /*
   * The create response does not return the user ID.
   * The single-user endpoint requires that ID, so we find the user by email
    * through the paginated users collection. We start at page 1, search the
    * data array, and continue through last_page until the created user is found.
    * Its ID is then saved for the update, verification, and delete requests.
   */
  it("should find the created user id", () => {
    findUserOnPage(1, AdminToken, newUser).then((id) => {
      userId = id;
    });
  });

  it("should not create the same user twice", () => {
    cy.request({
      method: 'POST',
      url: '/users/register',
      headers: {
        Authorization: `Bearer ${AdminToken}`
      },
      body: newUser,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(409);
      expect(response.body.email).to.be.an('array').and.not.be.empty;
      expect(response.body.email[0]).to.include('User already registered');
      cy.validateSchema('duplicateConflictResponse', response.body);
    });
  });

  it("should update the created user", () => {
    cy.request({
      method: 'PUT',
      url: `/users/${userId}`,
      headers: {
        Authorization: `Bearer ${AdminToken}`
      },
      body: updatedUser
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.deep.equal({ success: true });
      cy.validateSchema('updateResponse', response.body);
    });
  });

  it("should get the updated user", () => {
    cy.request({
      method: 'GET',
      url: `/users/${userId}`,
      headers: {
        Authorization: `Bearer ${AdminToken}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.validateSchema('userResponse', response.body);

      expect(response.body.first_name).to.eq(updatedUser.first_name);
      expect(response.body.last_name).to.eq(updatedUser.last_name);
      expect(response.body.address).to.eq(updatedUser.address);
      expect(response.body.city).to.eq(updatedUser.city);
      expect(response.body.state).to.eq(updatedUser.state);
      expect(response.body.country).to.eq(updatedUser.country);
      expect(response.body.postcode).to.eq(updatedUser.postcode);
      expect(String(response.body.phone)).to.eq(updatedUser.phone);
      expect(response.body.dob).to.eq(updatedUser.dob);
      expect(response.body.email).to.eq(updatedUser.email);
      expect(response.body.password).to.eq(updatedUser.password);
    });
  });

});
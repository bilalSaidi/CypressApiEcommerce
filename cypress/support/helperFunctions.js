const findUserOnPage = (page , AdminToken,newUser) => {
      return cy.request({
        method: 'GET',
        url: '/users',
        qs: { page },
        headers: {
          Authorization: `Bearer ${AdminToken}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);

        return cy.validateSchema('paginatedUserResponse', response.body).then(() => {
          const createdUser = response.body.data.find((user) => user.email === newUser.email);

          if (createdUser) {
            expect(createdUser).to.have.property('id').and.to.be.a('number');
            return createdUser.id;
          }

          if (page < response.body.last_page) {
            return findUserOnPage(page + 1, AdminToken, newUser);
          }

          throw new Error(`User with email ${newUser.email} was not found`);
        });
      });
    };

module.exports = { findUserOnPage };
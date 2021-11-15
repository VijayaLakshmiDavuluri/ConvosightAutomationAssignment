var Token
var random=Cypress._.random(0, 100)
var Testdata = require("../fixtures/APITestData.json")
var APIbaseUrl = Cypress.config().APIbaseUrl
describe("Automating Automation Practice site - Convosight assignment", () => {

    it("Add User , POST API.", () => {
        cy.request({
            url: APIbaseUrl+"users",
            method: 'POST',
            body: Testdata.newUser
        }).then(response => {
            expect(response.status).to.eq(200);
            cy.log(response.body.user)
            Token= response.body.token

        });
    })
    it("Fetch User , GET API", () => {
        cy.request({
            url: APIbaseUrl+"users/me",
            method: 'GET',
            header: {
                Authorization : 'Bearer ' + Token
            }
        }).then(response => {
            expect(response.status).to.eq(201);
            cy.log(response.body)
        });
    })

    it("Add Contact , POST API", () => {
        cy.request({
            url: APIbaseUrl+"contacts",
            method: 'POST',
            header:
            {
                Authorization : 'Bearer ' + Token
            },
            body: Testdata.addContact
        }).then(response => {
            expect(response.status).to.eq(200);
            cy.log(response.body)
        });
    })
       it("Update Contact , PUT API", () => {
            cy.request({
                url: APIbaseUrl+`contacts/${contactId}`,
                method: 'PUT',
                header:
                {
                    Authorization : 'Bearer ' + Token
                },

            }).then(response => {
                expect(response.status).to.eq(200);
                cy.log(response.body)
            });
        })
        it("Delete Contact , DEL API", () => {
            cy.request({
                url: APIbaseUrl+`contacts/${contactId}`,
                method: 'DELETE',
                header:
                {
                    Authorization : 'Bearer ' + Token
                },

            }).then(response => {
                expect(response.status).to.eq(200);
                cy.log(response.body)
            });
        })
        it("Get Contact , GET API", () => {
            cy.request({
                url: APIbaseUrl+`contacts/${contactId}`,
                method: 'GET',
                header:
                {
                    Authorization : 'Bearer ' + Token
                },

            }).then(response => {
                expect(response.status).to.eq(200);
                cy.log(response.body)
            });
        })
    //Validate firstName,lastName and email fields value returned by Fetch User api is same as provided while adding a user.
    //Validate that no field has value as undefined or empty value.
    //Validate user is not able to fetch user details with invalid token.
    //Validate contact is added successfully using Add Contact API. Also, validate the response values for each field is correct.
    //Validate contact is deleted successfully using Delete Contact API. Also, Validate Get Contact API returns error while fetching the deleted contact.

})
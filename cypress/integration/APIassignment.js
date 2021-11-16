var token
var random=Cypress._.random(0, 100)
const { expect } = require("chai")
var Testdata = require("../fixtures/APITestData.json")
var APIbaseUrl = Cypress.config().APIbaseUrl
var PostUserData
var contactId
var addContact
describe("Automating Automation Practice site - Convosight assignment", () => {

    it("Add User , POST API.", () => {
        cy.request({
            url: APIbaseUrl+"users",
            method: 'POST',
            body: Testdata.newUser
        }).then(response => {
            expect(response.status).to.eq(201);
            cy.log(response.body.user)
            token= response.body.token
            PostUserData=response.body.user
            expect(Object.values(PostUserData)).to.not.contain(null)
            expect(Object.values(PostUserData)).to.not.contain("undefined")
        });
    })
    it("Fetch User , GET API", () => {
        cy.request({
            url: APIbaseUrl+"users/me",
            method: 'GET',
            header: {
                Authorization : `Bearer ${token}`
            }
        }).then(response1 => {
            expect(response1.status).to.eq(201);
            cy.log(response1.body)
            //expect(response1.body).to.eql(PostUserData)
           expect(response1.body.firstName).to.eql(PostUserData.firstName)
           expect(response1.body.lastName).to.eql(PostUserData.lastName)
           expect(response1.body.email).to.eql(PostUserData.email)
      

        });
    })
    it("Fetch User , GET API - Invalid Token", () => {
        cy.request({
            url: APIbaseUrl+"users/me",
            method: 'GET',
            header: {
                Authorization : "@@@"+token 
            }
        }).then(response1 => {
            expect(response1.status).to.eq(401);
            expect(response.body.error).to.eql("Please authenticate.")
        });
    })


    it("Add Contact , POST API", () => {
        cy.request({
            url: APIbaseUrl+"contacts",
            method: 'POST',
            header:
            {
                Authorization : 'Bearer ' + token
            },
            body: Testdata.addContact
        }).then(response => {
            expect(response.status).to.eq(201);
            cy.log(response.body)
            contactId = response.body._id
            addContact = response.body
        });
    })
       it("Update Contact , PUT API", () => {
        Testdata.addContact.lastName = "UpdatedName"
            cy.request({
                url: APIbaseUrl+`contacts/${contactId}`,
                method: 'PUT',
                header:
                {
                    Authorization : 'Bearer ' + token
                },
                body: Testdata.addContact

            }).then(response => {
                expect(response.status).to.eq(200);
                cy.log(response.body)
                expect(response.body).to.not.eql(addContact)
            });
        })
        it("Delete Contact , DEL API", () => {
            cy.request({
                url: APIbaseUrl+`contacts/${contactId}`,
                method: 'DELETE',
                header:
                {
                    Authorization : 'Bearer ' + token
                },

            }).then(response => {
                expect(response.status).to.eq(201);
                expect(response.body).to.contain("Contact deleted")
            });
        })
        it("Get Contact , GET API", () => {
            cy.request({
                url: APIbaseUrl+`contacts/${contactId}`,
                method: 'GET',
                header:
                {
                    Authorization : 'Bearer ' + token
                },

            }).then(response => {
                expect(response.status).to.eq(404);
            });
        })

})
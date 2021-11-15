import { expect } from "chai"
let Testdata= require("../fixtures/TestdataUI.json")
let identify= require("../fixtures/Locators.json")
var i
var discountedprice = 0
describe("Automating Automation Practice site - Convosight assignment", () => {



    before(() => {
        //navigate to URL
        cy.visit(Cypress.config().baseUrl);

    })

    it(`1. Validate search suggestion is not given to user until 3 char are populated and 
        2. Validate results are displayed according the search made by user.`, () => {
        cy.wrap(Testdata.searchterms).each((srch, v) => {
            //Type in Search Box
            cy.get(identify.search).should('be.visible').clear().type(srch);
            //Click to Search
            cy.get(identify.searchClick).click();
            //Verify Search result page heading
            cy.get(identify.Heading).should('contain.text', Testdata.srchText);
            if (srch.length < 3) {
                cy.get(identify.Noresults).contains(Testdata.noResultError + ' ' + `"` + srch + `"`)
            }
            else {
                cy.get(identify.sortFilter).should('be.visible');

                cy.get(identify.ItemList).then((ele) => {
                    expect(ele.length).to.be.greaterThan(0)
                })

            //Verifying Search results contains search term
                cy.get(identify.ItemLink).then((img) => {

                    for (var j = 0; j < img.length; j++) {
                        expect(img[j].getAttribute('title')).to.include(srch)
                    }


                })

            }

        })
    })
    it("Validate user is able to apply the large size catalouge filter for T-shirt section.", () => {
            //Incomplete
    })
    it("Validate user is able to upload a file on contact us page.", () => {
        //Click on Contact us
        cy.get(identify.ContactUs).should("be.visible").click()
        //Validating status before file upload
        cy.get(identify.FileInput).should('contain', Testdata.Nofile)
        //Upload file
        cy.get(identify.uploadFile).attachFile(Testdata.filename)
        //Verify FIle upload status
        cy.get(identify.FileInput).should('contain', Testdata.filename)

    })
    it("Add 5 products in the cart. Validate total cart amount and individual product price both with and without discount.", () => {
      cy.wrap(Testdata.selectitems).each((item,v)=>{

        cy.get(identify.search).should('be.visible').clear().type(item);
        cy.get(identify.searchClick).click();
        cy.get(identify.ItemLink).first().scrollIntoView().click()
        cy.get(identify.addtoCart).click()
        cy.get(identify.ContinueShoping).click()
   
    })
    cy.get(identify.ViewCart).click()
    cy.get(identify.IndTotalPrice).then((Indtotal)=>{
        for(i=0;i<Indtotal.length;i++)
        {
            var total = parseFloat(Indtotal[i].innerText.split('$')[1])
            discountedprice = discountedprice + total
            cy.log(discountedprice)
        }
        
      
        cy.get(identify.TotalPrice).invoke('text').then((total)=>{
            expect(total).to.eql('$'+ discountedprice)
        })

    })

})
      
      
     
})
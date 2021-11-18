let Testdata = require("../fixtures/TestdataUI.json");
let identify = require("../fixtures/Locators.json");
class PageActions{
	SearchFilter(srch) {
        cy.get(identify.search).should("be.visible").clear().type(srch);
        //Click to Search
        cy.get(identify.searchClick).click();
        //Verify Search result page heading
        cy.get(identify.Heading).should("contain.text", Testdata.srchText);
	}
}

module.exports = PageActions;

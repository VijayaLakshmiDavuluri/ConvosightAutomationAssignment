// /******/ (() => { // webpackBootstrap
// /******/ 	var __webpack_modules__ = ({

// /***/ 292:
// /***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

// let Testdata = __nccwpck_require__(844);
// let identify = __nccwpck_require__(258);
// class PageActions{
// 	SearchFilter(srch) {
//         cy.get(identify.search).should("be.visible").clear().type(srch);
//         //Click to Search
//         cy.get(identify.searchClick).click();
//         //Verify Search result page heading
//         cy.get(identify.Heading).should("contain.text", Testdata.srchText);
// 	}
// }

// module.exports = PageActions;


// /***/ }),

// /***/ 258:
// /***/ ((module) => {

// "use strict";
// module.exports = JSON.parse('{"search":"#search_query_top","searchClick":"[name=\'submit_search\']","Heading":".page-heading","Noresults":".alert.alert-warning","sortFilter":"#productsSortForm","ItemList":"#center_column>ul>li","ItemLink":".product_img_link","ContactUs":"#contact-link","FileInput":".filename","uploadFile":"#fileUpload","addtoCart":"#add_to_cart","ContinueShoping":".continue.btn","ViewCart":"[title=\'View my shopping cart\']","IndTotalPrice":"td.cart_total>.price","TotalPrice":"#total_product","TShirtCat":"#block_top_menu> ul>li>a"}');

// /***/ }),

// /***/ 844:
// /***/ ((module) => {

// "use strict";
// module.exports = JSON.parse('{"searchterms":["P","Pr","Pri","Printed"],"selectitems":["Blouse","shirt","chiffon","skirt","printed dress"],"srchText":"Search","noResultError":"No results were found for your search","filename":"openstitch.jpeg","Nofile":"No file selected","TShirt":"T-shirts"}');

// /***/ })

// /******/ 	});
// /************************************************************************/
// /******/ 	// The module cache
// /******/ 	var __webpack_module_cache__ = {};
// /******/ 	
// /******/ 	// The require function
// /******/ 	function __nccwpck_require__(moduleId) {
// /******/ 		// Check if module is in cache
// /******/ 		var cachedModule = __webpack_module_cache__[moduleId];
// /******/ 		if (cachedModule !== undefined) {
// /******/ 			return cachedModule.exports;
// /******/ 		}
// /******/ 		// Create a new module (and put it into the cache)
// /******/ 		var module = __webpack_module_cache__[moduleId] = {
// /******/ 			// no module.id needed
// /******/ 			// no module.loaded needed
// /******/ 			exports: {}
// /******/ 		};
// /******/ 	
// /******/ 		// Execute the module function
// /******/ 		var threw = true;
// /******/ 		try {
// /******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
// /******/ 			threw = false;
// /******/ 		} finally {
// /******/ 			if(threw) delete __webpack_module_cache__[moduleId];
// /******/ 		}
// /******/ 	
// /******/ 		// Return the exports of the module
// /******/ 		return module.exports;
// /******/ 	}
// /******/ 	
// /************************************************************************/
// /******/ 	/* webpack/runtime/compat */
// /******/ 	
// /******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
// /******/ 	
// /************************************************************************/
// var __webpack_exports__ = {};
// // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
// (() => {
// let Testdata = __nccwpck_require__(844);
// let identify = __nccwpck_require__(258);
// let i;
// let discountedprice = 0;
// let Common = __nccwpck_require__(292);
// let commonfunc = new Common();
// describe("Automating Automation Practice site - Convosight assignment", () => {
//   before(() => {
//     //navigate to URL
//     cy.visit(Cypress.config().baseUrl);
//   });

//   it(`1. Validate search suggestion is not given to user until 3 char are populated and 
//         2. Validate results are displayed according the search made by user.`, () => {
//     cy.wrap(Testdata.searchterms).each((srch, v) => {
//       //Type in Search Box
//       commonfunc.SearchFilter(srch);
//       if (srch.length < 3) {
//         cy.get(identify.Noresults).contains(
//           Testdata.noResultError + " " + `"` + srch + `"`
//         );
//       } else {
//         cy.get(identify.sortFilter).should("be.visible");
//         cy.get(identify.ItemList).then((ele) => {
//           expect(ele.length).to.be.greaterThan(0);
//         });
//         //Verifying Search results contains search term
//         cy.get(identify.ItemLink).then((img) => {
//           for (let j = 0; j < img.length; j++) {
//             expect(img[j].getAttribute("title")).to.include(srch);
//           }
//         });
//       }
//     });
//   });
//   it("Validate user is able to apply the large size catalouge filter for T-shirt section.", () => {
//     cy.get(identify.TShirtCat).then((tshirt) => {
//       for (let j = 0; j < tshirt.length; j++) {
//         if (tshirt[j].getAttribute("title") == "T-shirts") {
//           tshirt[j].click();
//         }
//         cy.get(identify.Heading).should("contain.text", Testdata.TShirt);
//       }
//     });
//   });
//   it("Validate user is able to upload a file on contact us page.", () => {
//     //Click on Contact us
//     cy.get(identify.ContactUs).should("be.visible").click();
//     //Validating status before file upload
//     cy.get(identify.FileInput).should("contain", Testdata.Nofile);
//     //Upload file
//     cy.get(identify.uploadFile).attachFile(Testdata.filename);
//     //Verify FIle upload status
//     cy.get(identify.FileInput).should("contain", Testdata.filename);
//   });
//   it("Add 5 products in the cart. Validate total cart amount and individual product price both with and without discount.", () => {
//     cy.wrap(Testdata.selectitems).each((item, v) => {
//       commonfunc.SearchFilter(item);
//       cy.get(identify.ItemLink).first().scrollIntoView().click();
//       cy.get(identify.addtoCart).click();
//       cy.get(identify.ContinueShoping).click();
//     });
//     cy.get(identify.ViewCart).click();
//     cy.get(identify.IndTotalPrice).then((Indtotal) => {
//       for (i = 0; i < Indtotal.length; i++) {
//         let total = parseFloat(Indtotal[i].innerText.split("$")[1]);
//         discountedprice = discountedprice + total;
//         cy.log(discountedprice);
//       }

//       cy.get(identify.TotalPrice)
//         .invoke("text")
//         .then((total) => {
//           expect(total).to.eql("$" + discountedprice);
//         });
//     });
//   });
// });

// })();

// module.exports = __webpack_exports__;
// /******/ })()
// ;
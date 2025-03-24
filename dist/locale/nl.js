/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const message = {
  toolbar: {
    undo: 'Ongedaan maken',
    redo: 'Opnieuw uitvoeren',
    paintformat: 'Opmaak kopiëren/plakken',
    clearformat: 'Opmaak wissen',
    format: 'Opmaak',
    font: 'Lettertype',
    fontSize: 'Tekengrootte',
    fontBold: 'Vet',
    fontItalic: 'Cursief',
    underline: 'Onderstrepen',
    strike: 'Doorstrepen',
    textColor: 'Tekstkleur',
    fillColor: 'Opvulkleur',
    border: 'Randen',
    merge: 'Cellen samenvoegen',
    align: 'Horizontale uitlijning',
    valign: 'Verticale uitlijning',
    textwrap: 'Terugloop',
    freeze: 'Cel bevriezen',
    formula: 'Functies',
    more: 'Meer'
  },
  contextmenu: {
    copy: 'Kopiëren',
    cut: 'Knippen',
    paste: 'Plakken',
    pasteValue: 'Alleen waarden plakken',
    pasteFormat: 'Alleen opmaak plakken',
    insertRow: 'Rij invoegen',
    insertColumn: 'Kolom invoegen',
    deleteRow: 'Rij verwijderen',
    deleteColumn: 'Kolom verwijderen',
    deleteCell: 'Cel verwijderen',
    deleteCellText: 'Celtekst verwijderen'
  },
  format: {
    normal: 'Standaard',
    text: 'Tekst',
    number: 'Nummer',
    percent: 'Percentage',
    rmb: 'RMB',
    usd: 'USD',
    date: 'Datum',
    time: 'Tijdstip',
    datetime: 'Datum tijd',
    duration: 'Duratie'
  },
  formula: {
    sum: 'Som',
    average: 'Gemiddelde',
    max: 'Max',
    min: 'Min',
    concat: 'Concat'
  }
};
if (window && window.x_spreadsheet) {
  window.x_spreadsheet.$messages = window.x_spreadsheet.$messages || {};
  window.x_spreadsheet.$messages['nl'] = message;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (message);

/******/ })()
;
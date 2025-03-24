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
    undo: 'Rückgängig machen',
    redo: 'Wiederherstellen',
    paintformat: 'Format kopieren/einfügen',
    clearformat: 'Format löschen',
    format: 'Format',
    font: 'Schriftart',
    fontSize: 'Schriftgrad',
    fontBold: 'Fett',
    fontItalic: 'Kursiv',
    underline: 'Betonen',
    strike: 'Streichen',
    textColor: 'Text Farbe',
    fillColor: 'Füllung Farbe',
    border: 'Umrandung',
    merge: 'Zellen verbinden',
    align: 'Waagrechte Ausrichtung',
    valign: 'Vertikale uitlijning',
    textwrap: 'Textumbruch',
    freeze: 'Zelle sperren',
    formula: 'Funktionen',
    more: 'Mehr'
  },
  contextmenu: {
    copy: 'Kopieren',
    cut: 'Ausschneiden',
    paste: 'Einfügen',
    pasteValue: 'Nur Werte einfügen',
    pasteFormat: 'Nur Format einfügen',
    pasteColsToRows: 'Nur Spalten in Zeilen einfügen',
    pasteRowsToCols: 'Nur Zeilen in Spalten einfügen',
    insertRow: 'Zeile einfügen',
    insertColumn: 'Spalte einfügen',
    deleteRow: 'Zeile löschen',
    deleteColumn: 'Spalte löschen',
    deleteCell: 'Zelle löschen',
    deleteCellText: 'Zellentext löschen'
  },
  format: {
    normal: 'Regulär',
    text: 'Text',
    number: 'Nummer',
    percent: 'Prozent',
    rmb: 'RMB',
    usd: 'USD',
    date: 'Datum',
    time: 'Termin',
    datetime: 'Datum Termin',
    duration: 'Dauer'
  },
  formula: {
    sum: 'Summe',
    average: 'Durchschnittliche',
    max: 'Max',
    min: 'Min',
    concat: 'Concat'
  }
};
if (window && window.x_spreadsheet) {
  window.x_spreadsheet.$messages = window.x_spreadsheet.$messages || {};
  window.x_spreadsheet.$messages['de'] = message;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (message);

/******/ })()
;
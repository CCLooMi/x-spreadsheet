/* global window */
export const cssPrefix = 'x-spreadsheet';
export const dpr = window.devicePixelRatio || 1;
let containerEle=null;
export function setContainerEle(ele) {
  if(containerEle) return;
  containerEle=ele;
}
export function getContainerEle() { return containerEle; }
export default {
  cssPrefix,
  dpr,
  setContainerEle,
  getContainerEle
};

import { Element, h } from './element';
import { cssPrefix } from '../config';
import {clickOutside,watchDomHidden} from  '../core/util'

export default class Dropdown extends Element {
  constructor(targetEl,title, width, showArrow, placement, ...children) {
    super('div', `${cssPrefix}-dropdown ${placement}`);
    this.targetEl = targetEl;
    this.title = title;
    this.change = () => {};
    this.headerClick = () => {};
    if (typeof title === 'string') {
      this.title = h('div', `${cssPrefix}-dropdown-title`).child(title);
    } else if (showArrow) {
      this.title.addClass('arrow-left');
    }
    this.contentEl = h('div', `${cssPrefix}-dropdown-content`)
      .css('width', width)
      .hide();

    this.setContentChildren(...children);

    this.headerEl = h('div', `${cssPrefix}-dropdown-header`);
    this.headerEl.on('click', () => {
      if (this.contentEl.css('display') !== 'block') {
        this.show();
      } else {
        this.hide();
      }
    }).children(
      this.title,
      showArrow ? h('div', `${cssPrefix}-icon arrow-right`).child(
        h('div', `${cssPrefix}-icon-img arrow-down`),
      ) : '',
    );
    this.children(this.headerEl, this.contentEl);
  }

  setContentChildren(...children) {
    this.contentEl.html('');
    if (children.length > 0) {
      this.contentEl.children(...children);
    }
  }

  setTitle(title) {
    this.title.html(title);
    this.hide();
  }

  show() {
    const { contentEl } = this;
    contentEl.show();
    this.parent().active();
    let r = clickOutside(this.targetEl.el,this.parent().el,()=>{
      this.hide();
    },false);
    watchDomHidden(this.contentEl.el,r);
  }

  hide() {
    this.parent().active(false);
    this.contentEl.hide();
  }
}

/* global window */

import Align from './align';
import Valign from './valign';
import Autofilter from './autofilter';
import Bold from './bold';
import Italic from './italic';
import Strike from './strike';
import Underline from './underline';
import Border from './border';
import Clearformat from './clearformat';
import Paintformat from './paintformat';
import TextColor from './text_color';
import FillColor from './fill_color';
import FontSize from './font_size';
import Font from './font';
import Format from './format';
import Formula from './formula';
import Freeze from './freeze';
import Merge from './merge';
import Redo from './redo';
import Undo from './undo';
import Print from './print';
import Textwrap from './textwrap';
import More from './more';
import Item from './item';

import { h } from '../element';
import { cssPrefix } from '../../config';
import { bind } from '../event';
import {watchInDomTree,watchDomResize} from "../../core/util";
import Sharp from "./sharp";

function buildDivider() {
  return h('div', `${cssPrefix}-toolbar-divider`);
}

function initBtns2() {
  this.btns2 = [];
  this.items.forEach((it) => {
    if (Array.isArray(it)) {
      it.forEach(({ el }) => {
        const rect = el.box();
        const { marginLeft, marginRight } = el.computedStyle();
        this.btns2.push([el, rect.width + parseInt(marginLeft, 10) + parseInt(marginRight, 10)]);
      });
    } else {
      const rect = it.box();
      const { marginLeft, marginRight } = it.computedStyle();
      this.btns2.push([it, rect.width + parseInt(marginLeft, 10) + parseInt(marginRight, 10)]);
    }
  });
}

function moreResize() {
  const {
    el, btns, moreEl, btns2,
  } = this;
  const { moreBtns, contentEl } = moreEl.dd;
  const elBox = el.box();

  let sumWidth = 160;
  let sumWidth2 = 12;
  const list1 = [];
  const list2 = [];
  btns2.forEach(([it, w], index) => {
    sumWidth += w;
    if (index === btns2.length - 1 || sumWidth < elBox.width) {
      list1.push(it);
    } else {
      sumWidth2 += w;
      list2.push(it);
    }
  });
  btns.html('').children(...list1);
  moreBtns.html('').children(...list2);
  contentEl.css('width', `${sumWidth2}px`);
  if (list2.length > 0) {
    moreEl.show();
  } else {
    moreEl.hide();
  }
}

function genBtn(it) {
  const btn = new Item(this.targetEl);
  btn.el.on('click', () => {
    if (it.onClick) it.onClick(this.data.getData(), this.data);
  });
  btn.tip = it.tip || '';

  let { el } = it;

  if (it.icon) {
    el = h('img').attr('src', it.icon);
  }

  if (el) {
    const icon = h('div', `${cssPrefix}-icon`);
    icon.child(el);
    btn.el.child(icon);
  }

  return btn;
}

export default class Toolbar {
  constructor(targetEl, data, isHide = false) {
    this.targetEl = targetEl;
    this.data = data;
    this.change = () => {};
    this.isHide = isHide;
    const style = data.defaultStyle();
    this.items = [
      [
        this.undoEl = new Undo(this.targetEl),
        this.redoEl = new Redo(this.targetEl),
        new Print(this.targetEl),
        this.paintformatEl = new Paintformat(this.targetEl),
        this.clearformatEl = new Clearformat(this.targetEl),
      ],
      buildDivider(),
      [
        this.formatEl = new Format(this.targetEl),
      ],
      buildDivider(),
      [
        this.fontEl = new Font(this.targetEl),
        this.fontSizeEl = new FontSize(this.targetEl),
      ],
      buildDivider(),
      [
        this.boldEl = new Bold(this.targetEl),
        this.italicEl = new Italic(this.targetEl),
        this.underlineEl = new Underline(this.targetEl),
        this.strikeEl = new Strike(this.targetEl),
        this.textColorEl = new TextColor(this.targetEl,style.color),
      ],
      buildDivider(),
      [
        this.fillColorEl = new FillColor(this.targetEl,style.bgcolor),
        this.borderEl = new Border(this.targetEl),
        this.mergeEl = new Merge(this.targetEl),
      ],
      buildDivider(),
      [
        this.alignEl = new Align(this.targetEl,style.align),
        this.valignEl = new Valign(this.targetEl,style.valign),
        this.textwrapEl = new Textwrap(this.targetEl),
      ],
      buildDivider(),
      [
        this.freezeEl = new Freeze(this.targetEl),
        this.autofilterEl = new Autofilter(this.targetEl),
        this.formulaEl = new Formula(this.targetEl),
        this.sharpEl = new Sharp(this.targetEl),
      ],
    ];

    const { extendToolbar = {} } = data.settings;

    if (extendToolbar.left && extendToolbar.left.length > 0) {
      this.items.unshift(buildDivider());
      const btns = extendToolbar.left.map(genBtn.bind(this));

      this.items.unshift(btns);
    }
    if (extendToolbar.right && extendToolbar.right.length > 0) {
      this.items.push(buildDivider());
      const btns = extendToolbar.right.map(genBtn.bind(this));
      this.items.push(btns);
    }

    this.items.push([this.moreEl = new More(this.targetEl)]);

    this.el = h('div', `${cssPrefix}-toolbar`);
    this.btns = h('div', `${cssPrefix}-toolbar-btns`);

    this.items.forEach((it) => {
      if (Array.isArray(it)) {
        it.forEach((i) => {
          this.btns.child(i.el);
          i.change = (...args) => {
            this.change(...args);
          };
        });
      } else {
        this.btns.child(it.el);
      }
    });

    this.el.child(this.btns);
    if (isHide) {
      this.el.hide();
    } else {
      this.reset();
      setTimeout(() => {
        initBtns2.call(this);
        moreResize.call(this);
        watchInDomTree(this.targetEl.el,watchDomResize(this.targetEl.el, () => {
          moreResize.call(this);
        }));
      }, 0);
    }
  }

  paintformatActive() {
    return this.paintformatEl.active();
  }

  paintformatToggle() {
    this.paintformatEl.toggle();
  }

  trigger(type) {
    this[`${type}El`].click();
  }

  resetData(data) {
    this.data = data;
    this.reset();
  }

  reset() {
    if (this.isHide) return;
    const { data } = this;
    const style = data.getSelectedCellStyle();
    // console.log('canUndo:', data.canUndo());
    this.undoEl.setState(!data.canUndo());
    this.redoEl.setState(!data.canRedo());
    this.mergeEl.setState(data.canUnmerge(), !data.selector.multiple());
    this.autofilterEl.setState(!data.canAutofilter());
    // this.mergeEl.disabled();
    // console.log('selectedCell:', style, cell);
    const { font, format } = style;
    this.formatEl.setState(format);
    this.fontEl.setState(font.name);
    this.fontSizeEl.setState(font.size);
    this.boldEl.setState(font.bold);
    this.italicEl.setState(font.italic);
    this.underlineEl.setState(style.underline);
    this.strikeEl.setState(style.strike);
    this.textColorEl.setState(style.color);
    this.fillColorEl.setState(style.bgcolor);
    this.alignEl.setState(style.align);
    this.valignEl.setState(style.valign);
    this.textwrapEl.setState(style.textwrap);
    // console.log('freeze is Active:', data.freezeIsActive());
    this.freezeEl.setState(data.freezeIsActive());
  }
}

/* global document */
/* global window */
import { h } from './element';
import Icon from './icon';
import { cssPrefix } from '../config';
import { bind, unbind } from './event';

export default class Modal {
  constructor(targetEl, title, content, width = '600px') {
    this.targetEl = targetEl;
    this.title = title;
    this.el = h('div', `${cssPrefix}-modal`).css('width', width).children(
      h('div', `${cssPrefix}-modal-header`).children(
        new Icon('close').on('click.stop', () => this.hide()),
        this.title,
      ),
      h('div', `${cssPrefix}-modal-content`).children(...content),
    ).hide();
  }

  show() {
    // dimmer
    this.dimmer = h('div', `${cssPrefix}-dimmer active`);
    this.targetEl.el.appendChild(this.dimmer.el);
    const { width, height } = this.el.show().box();
    const { clientHeight, clientWidth } = document.documentElement;
    this.el.offset({
      left: (clientWidth - width) / 2,
      top: (clientHeight - height) / 3,
    });
    window.xkeydownEsc = (evt) => {
      if (evt.keyCode === 27) {
        this.hide();
      }
    };
    bind(window, 'keydown', window.xkeydownEsc);
  }

  hide() {
    this.el.hide();
    this.targetEl.el.removeChild(this.dimmer.el);
    unbind(window, 'keydown', window.xkeydownEsc);
    delete window.xkeydownEsc;
  }
}

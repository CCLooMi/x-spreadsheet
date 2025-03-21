/* global document */
import { h } from './element';
import { bind } from './event';
import Config from '../config';

export default function tooltip(html, target) {
  if (target.classList.contains('active')) {
    return;
  }
  const {
    left, top, width, height,
  } = target.getBoundingClientRect();
  const el = h('div', `${Config.cssPrefix}-tooltip`).html(html).show();
  Config.containerEle.appendChild(el.el);
  const elBox = el.box();
  // console.log('elBox:', elBox);
  el.css('left', `${left + (width / 2) - (elBox.width / 2)}px`)
    .css('top', `${top + height + 2}px`);

  bind(target, 'mouseleave', () => {
    if (Config.containerEle.contains(el.el)) {
      Config.containerEle.removeChild(el.el);
    }
  });

  bind(target, 'click', () => {
    if (Config.containerEle.contains(el.el)) {
      Config.containerEle.removeChild(el.el);
    }
  });
}

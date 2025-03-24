/* global document */
import { h } from './element';
import { bind } from './event';
import {cssPrefix} from '../config';

export default function tooltip(targetEl,html, target) {
  if (target.classList.contains('active')) {
    return;
  }
  const {
    left, top, width, height,
  } = target.getBoundingClientRect();
  const el = h('div', `${cssPrefix}-tooltip`).html(html).show();
  targetEl.el.appendChild(el.el);
  const elBox = el.box();
  // console.log('elBox:', elBox);
  el.css('left', `${left + (width / 2) - (elBox.width / 2)}px`)
    .css('top', `${top + height + 2}px`);

  bind(target, 'mouseleave', () => {
    if (targetEl.el.contains(el.el)) {
      targetEl.el.removeChild(el.el);
    }
  });

  bind(target, 'click', () => {
    if (targetEl.el.contains(el.el)) {
      targetEl.el.removeChild(el.el);
    }
  });
}

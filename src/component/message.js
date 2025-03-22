/* global document */
import { h } from './element';
import Icon from './icon';
import Config ,{ cssPrefix } from '../config';

export function xtoast(title, content) {
  const el = h('div', `${cssPrefix}-toast`);
  const dimmer = h('div', `${cssPrefix}-dimmer active`);
  const remove = () => {
    Config.getContainerEle().removeChild(el.el);
    Config.getContainerEle().removeChild(dimmer.el);
  };

  el.children(
    h('div', `${cssPrefix}-toast-header`).children(
      new Icon('close').on('click.stop', () => remove()),
      title,
    ),
    h('div', `${cssPrefix}-toast-content`).html(content),
  );
  Config.getContainerEle().appendChild(el.el);
  Config.getContainerEle().appendChild(dimmer.el);
  // set offset
  const { width, height } = el.box();
  const { clientHeight, clientWidth } = document.documentElement;
  el.offset({
    left: (clientWidth - width) / 2,
    top: (clientHeight - height) / 3,
  });
}

export default {};

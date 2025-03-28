import Dropdown from '../dropdown';
import DropdownItem from './dropdown_item';

import { cssPrefix } from '../../config';
import { h } from '../element';
import Icon from '../icon';

class DropdownMore extends Dropdown {
  constructor(targetEl) {
    const icon = new Icon('ellipsis');
    const moreBtns = h('div', `${cssPrefix}-toolbar-more`);
    super(targetEl,icon, 'auto', false, 'bottom-right', moreBtns);
    this.moreBtns = moreBtns;
    this.contentEl.css('max-width', '420px');
  }
}

export default class More extends DropdownItem {
  constructor(targetEl) {
    super(targetEl,'more');
    this.el.hide();
  }

  dropdown() {
    return new DropdownMore(this.targetEl);
  }

  show() {
    this.el.show();
  }

  hide() {
    this.el.hide();
  }
}

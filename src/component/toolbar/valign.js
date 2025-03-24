import DropdownItem from './dropdown_item';
import DropdownAlign from '../dropdown_align';

export default class Valign extends DropdownItem {
  constructor(targetEl,value) {
    super(targetEl,'valign', '', value);
  }

  dropdown() {
    const { value } = this;
    return new DropdownAlign(this.targetEl,['top', 'middle', 'bottom'], value);
  }
}

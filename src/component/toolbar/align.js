import DropdownItem from './dropdown_item';
import DropdownAlign from '../dropdown_align';

export default class Align extends DropdownItem {
  constructor(targetEl,value) {
    super(targetEl,'align', '', value);
  }

  dropdown() {
    const { value } = this;
    return new DropdownAlign(this.targetEl,['left', 'center', 'right'], value);
  }
}

import DropdownItem from './dropdown_item';
import DropdownColor from '../dropdown_color';

export default class TextColor extends DropdownItem {
  constructor(targetEl,color) {
    super(targetEl,'color', undefined, color);
  }

  dropdown() {
    const { tag, value } = this;
    return new DropdownColor(this.targetEl,tag, value);
  }
}

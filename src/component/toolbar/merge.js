import ToggleItem from './toggle_item';

export default class Merge extends ToggleItem {
  constructor(targetEl) {
    super(targetEl,'merge');
  }

  setState(active, disabled) {
    this.el.active(active).disabled(disabled);
  }
}

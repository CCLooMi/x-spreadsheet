import ToggleItem from './toggle_item';

export default class Italic extends ToggleItem {
  constructor(targetEl) {
    super(targetEl,'font-italic', 'Ctrl+I');
  }
}

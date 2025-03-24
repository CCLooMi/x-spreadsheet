import ToggleItem from './toggle_item';

export default class Underline extends ToggleItem {
  constructor(targetEl) {
    super(targetEl,'underline', 'Ctrl+U');
  }
}

import ToggleItem from './toggle_item';

export default class Strike extends ToggleItem {
  constructor(targetEl) {
    super(targetEl,'strike', 'Ctrl+U');
  }
}

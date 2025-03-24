import ToggleItem from './toggle_item';

export default class Bold extends ToggleItem {
  constructor(targetEl) {
    super(targetEl,'font-bold', 'Ctrl+B');
  }
}

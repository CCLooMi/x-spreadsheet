import IconItem from './icon_item';

export default class Undo extends IconItem {
  constructor(targetEl) {
    super(targetEl,'undo', 'Ctrl+Z');
  }
}

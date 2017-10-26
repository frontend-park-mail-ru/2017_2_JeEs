import BaseView from '../baseview';
import ChangeTheme from './newStyles';

export default class MenuView extends BaseView {
    constructor(parent) {
        super(parent);
        this.template = require('./menu.pug');
    }

    create() {
        this.element.innerHTML = this.template({});
        document
            .getElementById('theme-switch')
            .addEventListener('click', () => { ChangeTheme();});
    }
}



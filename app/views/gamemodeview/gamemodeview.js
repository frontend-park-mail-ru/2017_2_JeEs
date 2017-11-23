import BaseView from '../baseview';

export default class GameModeView extends BaseView {
    constructor(parent) {
        super(parent);

        this.template = require('./gamemode.pug');
    }

    create() {
        this.element.innerHTML = this.template({});
    }

}
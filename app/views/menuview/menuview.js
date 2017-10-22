import BaseView from '../baseview';


export default class MenuView extends BaseView {
    constructor(parent) {
        super(parent);
        this.template = require('./menu.pug');
    }

    _createFirst() {
    }
}
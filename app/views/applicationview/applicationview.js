import BaseView from '../baseview';

export default class ApplicationView extends BaseView {
    constructor(parent) {
        super(parent);
        this.template = require('./application.pug');
    }

    _createFirst() {
    }

    getTopBar() {
        return document.querySelector(".top-bar");
    }

    getMainBlock() {
        return document.querySelector(".main-block");
    }
}
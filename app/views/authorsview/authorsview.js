import BaseView from '../baseview';

export default class CreatorsView extends BaseView {
    constructor(parent) {
        super(parent);

        this.template = require('./authors.pug');
    }

    create() {
        this.element.innerHTML = this.template({});
    }

}
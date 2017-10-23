import BaseView from '../baseview';

export default class NotFoundView extends BaseView {
    constructor(parent) {
        super(parent);

        this.template = require('./notfound.pug');
    }

    create() {
        this.element.innerHTML = this.template({});
    }

}
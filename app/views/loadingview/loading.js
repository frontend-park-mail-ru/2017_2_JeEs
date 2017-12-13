import BaseView from '../baseview';

export default class LoadingView extends BaseView {
    constructor(parent) {
        super(parent);

        this.template = require('./loading.pug');
    }

    create() {
        this.element.innerHTML = this.template({});
    }

}
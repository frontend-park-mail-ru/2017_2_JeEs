import BaseView from '../baseview';

export default class RulesView extends BaseView {
    constructor(parent) {
        super(parent);

        this.template = require('./rules.pug');
    }

    create() {
        this.element.innerHTML = this.template({});
    }

}
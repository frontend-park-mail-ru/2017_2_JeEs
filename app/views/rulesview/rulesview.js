import BaseView from '../baseview';
import Router from '../../modules/router';

export default class RulesView extends BaseView {
    constructor(parent) {
        super(parent);

        this.template = require('./rules.pug');
    }

    create() {
        this.element.innerHTML = this.template({});

        this.backButton = this.element.querySelector('.main-block__back-in-rules');

        this.backButton.addEventListener('click', (event) => {
            event.preventDefault();
            (new Router()).back();
        });
    }

}
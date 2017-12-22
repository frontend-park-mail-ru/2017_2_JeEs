import BaseView from '../baseview';
import Router from '../../modules/router';

export default class CreatorsView extends BaseView {
    constructor(parent) {
        super(parent);

        this.template = require('./authors.pug');
    }

    create() {
        this.element.innerHTML = this.template({});

        this.backButton = this.element.querySelector('.main-block__back-button');

        this.backButton.addEventListener('click', (formdata) => {
            event.preventDefault;
            (new Router()).back();
        });
    }

}
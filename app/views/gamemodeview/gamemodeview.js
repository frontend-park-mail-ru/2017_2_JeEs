import BaseView from '../baseview';
import Router from '../../modules/router';

export default class GameModeView extends BaseView {
    constructor(parent) {
        super(parent);

        this.template = require('./gamemode.pug');
    }

    create() {
        this.element.innerHTML = this.template({});

        this.backButton = this.element.querySelector('.main-block__back');

        this.backButton.addEventListener('click', (event) => {
            event.preventDefault();
            (new Router()).back();
        });
    }

}
import BaseView from '../baseview';
import Router from '../../modules/router';


export default class ApplicationView extends BaseView {
    constructor(parent) {
        super(parent);
        this.template = require('./application.pug');
    }

    create() {
        this.element.innerHTML = this.template({});

        this.gameName = this.element.querySelector('.game-name-block__game-name');



        this.gameName.addEventListener('click', (formdata) => {
            (new Router()).go('/');
        });

        this.backButton = this.element.querySelector('.central-block__button-to-back');




        // this.backButton.addEventListener('click', (formdata) => {
        //     event.preventDefault;
        //     (new Router()).back();
        // });
    }



    getTopBar() {
        return document.querySelector('.top-bar');
    }

    getMainBlock() {
        return document.querySelector('.main-block');
    }
}
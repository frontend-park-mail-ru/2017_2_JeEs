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

        this.backButton = this.element.querySelector('.modes__multiplayer');

        this.backButton.addEventListener('click', (event) => {
            event.preventDefault();
            if (!this.userService.getUsername()) {
                (new Router()).go("/signin");
                return;
            }
            (new Router()).go("/game?mode=multiplayer");
        });
    }
}
import BaseView from '../baseview';
import Game from '../../game/gameview/gameviewmanager';
import {GameManager, } from '../../game/game-manager.ts';

export default class GameView extends BaseView {
    constructor(parent) {
        super(parent);

        this.template = require('./game.pug');
    }

    create() {

        this.element.innerHTML = this.template({});
        this.game = new Game(17);

        window.sessionStorage['fieldDimension'] = '9';
        let gameManager = new GameManager();
        gameManager.gameView = this.game;
    }

}
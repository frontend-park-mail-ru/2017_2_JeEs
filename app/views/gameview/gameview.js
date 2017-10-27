import BaseView from '../baseview';
import Game from '../../game/gameview/view';
import {GameManager, } from '../../game/game-manager.ts';

export default class GameView extends BaseView {
    constructor(parent) {
        super(parent);

        this.template = require('./game.pug');
    }

    create() {

        this.element.innerHTML = this.template({});
        this.game = new Game(17);

        let gameManager = new GameManager(9);
        gameManager.gameView = this.game;
    }

}
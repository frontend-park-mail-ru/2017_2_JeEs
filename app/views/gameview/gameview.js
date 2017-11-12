import BaseView from '../baseview';
import Game from '../../game/gameview/gameviewmanager';
import {GameManager, } from '../../game/game-manager.ts';

export default class GameView extends BaseView {
    constructor(parent) {
        super(parent);

        this.template = require('./game.pug');
    }

    create() {

        // TODO: 17 and 9
        this.element.innerHTML = this.template({});
        this.game = new Game(9);

        let gameManager = new GameManager(5);
        gameManager.gameView = this.game;
    }

}
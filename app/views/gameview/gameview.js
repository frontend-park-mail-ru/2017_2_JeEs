import BaseView from '../baseview';
import Game from '../../game/gameview/gameviewmanager';
import { GameManager, } from '../../game/game-manager.ts';
import EventBus from '../../modules/event-bus.ts';
import EVENTS from '../../game/utils/events.ts';

export default class GameView extends BaseView {
    constructor(parent) {
        super(parent);

        this.template = require('./game.pug');
    }

    create(getParamsObject) {
        this.element.innerHTML = this.template({});
        this.game = new Game(17);

        window.sessionStorage['fieldDimension'] = '9';
        this.gameManager = new GameManager(getParamsObject.mode);

        this.eventBus = new EventBus;
        this.eventBus.emit(EVENTS.WEBSOCKET_OPEN);

        this.rulesBlock = document.body.querySelector('.interface__rules')

        this.rulesBlockButton = document.body.querySelector('.interface__button-to-close-rules')

        this.rulesBlockButton.addEventListener('click', evt => {
            evt.preventDefault();
            if (this.rulesBlock.style.visibility === "hidden") {
                this.rulesBlock.style.visibility = ""
                this.rulesBlockButton.textContent = "↓"
            } else {
                this.rulesBlock.style.visibility = "hidden"
                this.rulesBlockButton.textContent = "↑"
            }
        });

    }

    destroy() {
        this.eventBus.emit(EVENTS.WEBSOCKET_CLOSE);
        this.gameManager.destroy();
        this.gameManager = null;
        this.game = null;
    }



}
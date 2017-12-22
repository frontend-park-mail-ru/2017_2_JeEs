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
        this.prevChildren = this.element.childNodes;
        this.prevChildren.forEach(node => {
            if (node.nodeName.toLowerCase() !== 'div') {
                return;
            }
            node.style.visibility = "hidden";
        });

        this.gameDiv = document.createElement('div');
        this.gameDiv.className = "game";
        this.gameDiv.innerHTML = this.template({});
        this.element.appendChild(this.gameDiv);

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


        this._eventBus.on(EVENTS.OPPONENTHERO_WALL_PLACED, data => {
            this._heroManaher.OpponentsMove(data.point);
        });

        this._eventBus.on(EVENTS.MAINHERO_WALL_PLACED, data => {
            this._heroManaher.OpponentsMove(data.point);
        });
    }

    destroy() {
        this.eventBus.emit(EVENTS.WEBSOCKET_CLOSE);
        this.gameManager.destroy();
        this.gameManager = null;
        this.game.destroy();
        this.game = null;

        this.element.removeChild(this.gameDiv)


        this.prevChildren.forEach(node => {
            if (node.nodeName.toLowerCase() !== 'div') {
                return;
            }
            node.style.visibility = "";
        });
    }



}
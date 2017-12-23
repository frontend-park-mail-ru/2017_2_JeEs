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
        this.timer;
        this.timeout;


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

        this.rulesBlock = document.body.querySelector('.interface__rules');

        this.rulesBlockButton = document.body.querySelector('.interface__button-to-close-rules');

        this.rulesBlockButton.addEventListener('click', evt => {
            evt.preventDefault();
            if (this.rulesBlock.style.visibility === "hidden") {
                this.rulesBlock.style.visibility = "";
                this.rulesBlockButton.textContent = "↓";
            } else {
                this.rulesBlock.style.visibility = "hidden";
                this.rulesBlockButton.textContent = "↑";
            }
        });


        this.heroTwoWalls = document.body.querySelector('.hero--two__walls')

        this.eventBus.on(EVENTS.OPPONENTHERO_WALL_NUMBER, data => {
            this.heroTwoWalls.textContent = `Стенок: ${data}`
        });

        this.heroOneWalls = document.body.querySelector('.hero--one__walls')

        this.eventBus.on(EVENTS.MAINHERO_WALL_NUMBER, data => {
            this.heroOneWalls.textContent = `Стенок: ${data}`
        });

        this.eventBus.on(EVENTS.OPPONENTHERO_NAME, data => {
            let hero_one_name = document.body.querySelector('.hero--one__name')
            hero_one_name.textContent = this.userService.getUsername();

            let heto_two_name = document.body.querySelector('.hero--two__name')
            heto_two_name.textContent = data;
        });

        this.messageTimer = document.body.querySelector('.messsages__timer')

        this.messageText = document.body.querySelector('.messsages__text')

        this.eventBus.on(EVENTS.GAMEVIEW_SEND_MESSAGE, data => {
            if (this.messageTimer.style.display !== "none") {
                this.messageTimer.style.display = "none";
                this.messageText.style.display = "flex";
            }
            this.messageText.textContent = data;

            clearTimeout(this.timeout);
            this.timeout = setTimeout((data) => {
                this.messageText.style.display = "none";
                this.messageTimer.style.display = "flex";
            }, 5000)
        });


        this.eventBus.on(EVENTS.GAMEVIEW_START_TIMER, () => {
            clearInterval(this.timer);
            this.time = 60;
            this.timer = setInterval(() => {
                this.time--;
                this.messageTimer.textContent = this.time;
            }, 1000);

            setTimeout(() => {
                clearInterval(this.timer);
            }, 60000);
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


        this.heroTwoWalls = null;

        this.heroOneWalls = null;

        this.eventBus.remove(EVENTS.OPPONENTHERO_WALL_NUMBER);

        this.eventBus.remove(Events.MAINHERO_WALL_NUMBER);

        this.eventBus.remove(Events.OPPONENTHERO_NAME);
    }
}
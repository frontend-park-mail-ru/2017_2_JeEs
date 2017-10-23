import BaseView from '../baseview';

export default class GameView extends BaseView {
    constructor(parent) {
        super(parent);

        this.template = require('./game.pug');
    }

    create() {

        this.element.innerHTML = this.template({});
    }

}
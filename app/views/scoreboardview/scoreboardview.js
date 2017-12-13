import BaseView from '../baseview';

export default class ScoreboardView extends BaseView {
    constructor(parent) {
        super(parent);

        this.lowerOffset = 0;
        this.upperOffset = 0;
        this.limit = 30;

        this.template = require('./scoreboard.pug');
    }

    create() {
        this.userService.getScoreboard(this.lowerOffset, this.limit)
            .then((scoreboard) => {
                this.element.innerHTML = this.template({dataList: scoreboard});
                this.lowerOffset += this.limit;
            })
            .catch(() => {
                this.element.innerHTML = 'Нет данных';
            });
    }

}
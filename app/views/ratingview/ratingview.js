import BaseView from '../baseview';

export default class RatingView extends BaseView {
    constructor(parent) {
        super(parent);

        this.template = require('./rating.pug');
    }

    create() {
        this.element.innerHTML = this.template({dataList: ['user1', 'user2', 'user3', 'user4']});
        // this.element.innerHTML = this.template({dataList: ['user1', 'user2', 'user3', 'user4']});
    }

}
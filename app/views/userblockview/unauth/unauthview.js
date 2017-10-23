import BaseView from '../../baseview';

export default class UnauthUserView extends BaseView {
    constructor(parent) {
        super(parent);
        this.template = require('./unauth.pug');

        this.eventBus.on('user-block:unauth', () => {
            this.create();
        });
    }

    create() {
        this.element.innerHTML = this.template({});

    }
}
import BaseView from '../../baseview';
import UserBlock from '../../../blocks/userblock/unauthUserBlock';


export default class UnauthUserView extends BaseView {
    constructor(parent) {
        super(parent);
        this.template = require('./unauth.pug');

        this.eventBus.on('user-block:auth', () => {
            this.destroy()
        });


        this.eventBus.on('user-block:unauth', () => {
            this.create()
        });
    }

    _createFirst() {

    }
}
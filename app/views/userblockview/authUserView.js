import BaseView from '../baseview';
import UserBlock from '../../blocks/userblock/authUserBlock';


export default class AuthUserView extends BaseView {
    constructor(parent) {
        super(parent);
        this.block = new UserBlock();


        this.block.getChildBlock('logout').on('click', () => {
            this._logout()
        });


        this.eventBus.on('user-block:auth', () => {
            this.destroy();
            this.create()
        });

        this.eventBus.on('user-block:auth', () => {
            this.destroy();
            this.create()
        });
    }

    create() {
        this.parent.appendChildBlock('user-block', this.block);
    }

    _logout() {
        this.userService.logout()
            .then(() => this.eventBus.emit('user-block:unauth'));
    }
}
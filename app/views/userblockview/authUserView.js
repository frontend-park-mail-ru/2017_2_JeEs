import BaseView from '../baseview';
import UserBlock from '../../blocks/userblock/authUserBlock';


export default class AuthUserView extends BaseView {
    constructor(parent) {
        super(parent);
        this.block = new UserBlock();
        this.blockName = 'unauth';


        this.block.getChildBlock('logout').on('click', () => {
            this._logout()
        });

        this.eventBus.on('user-block:auth', () => {
            this.create()
        });

    }

    _logout() {
        this.userService.logout()
            .then(() => {
                this.destroy();
                this.eventBus.emit('user-block:unauth')
            });
    }
}
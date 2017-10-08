import BaseView from '../baseview';
import UserBlock from '../../blocks/userblock/unauthUserBlock';



export default class UnauthUserView extends BaseView {
    constructor(parent) {
        super(parent);

        this.blockName = 'auth';
        this.block = new UserBlock();


        this.block.getChildBlock('login').on('click', () => {
            this._auth()
        });

        this.block.getChildBlock('signup').on('click', () => {
            this._registration()
        });

        this.eventBus.on('user-block:unauth', () => {
            this.create()
        });

        this.eventBus.on('user-block:auth', () => {
            this.destroy();
        });
    }

    _auth() {
        this.eventBus.emit('main-block:auth-form-rm')
    }

    _registration() {
        this.eventBus.emit('main-block:registration-form-rm')
    }
}
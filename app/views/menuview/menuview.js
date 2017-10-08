import BaseView from '../baseview';
import MainMenu from '../../blocks/mainmenu/mainmenu';


export default class MenuView extends BaseView {
    constructor(parent) {
        super(parent);
        this.block = new MainMenu();
        this.blockName = 'main-menu';

        this.block.getChildBlock('play').on('click', () => {
            this._play()
        });

        this.block.getChildBlock('rating').on('click', () => {
            this._rating()
        });

        this.eventBus.on('main-block:main-menu', () => {
            this.create()
        });
    }


    _play() {
        this.userService.isLoggedIn()
            .then(() => {
                alert('Когда-нибудь тут будет игра')
            })
            .catch(() => {
                this.destroy();
                this.eventBus.emit('main-block:auth-form')
            });
    }

    _rating() {
        this.destroy();
        this.eventBus.emit('main-block:rating')
    }
}
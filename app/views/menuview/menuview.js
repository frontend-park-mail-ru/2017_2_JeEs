import BaseView from '../baseview';
import MainMenu from '../../blocks/mainmenu/mainmenu';



export default class MenuView extends BaseView {
    constructor(parent) {
        super(parent);
        this.block = new MainMenu();

        this.block.getChildBlock('play').on('click', () => {
            this._play()
        });

        this.eventBus.on('main-block:main-menu', () => {
            this.create()
        });
    }

    create() {
        this.parent.appendChildBlock('main-menu', this.block);
    }

    // destroy() {
    //     this.parent.removeAllChildren(); // надо удалять только этот элемент
    // }

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
}
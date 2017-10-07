import BaseView from '../baseview';
import MainMenu from '../../blocks/mainmenu/mainmenu';


export default class MenuView extends BaseView {
    constructor(parent) {
        super(parent);
        this.eventBus.on('main-block:main-menu', () => {
            this.create()
        });
    }

    create() {
        const mainMenu = new MainMenu();
        this.parent.appendChildBlock('main-block', mainMenu);

        mainMenu.getChildBlock('play').on('click', () => {
            this._play()
        });
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
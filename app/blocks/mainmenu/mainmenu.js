import Block from '../block/block';

const buttons = [
    {
        name: 'play',
        text: 'Играть'
    },
    {
        name: 'settings',
        text: 'Настройки'
    },
    {
        name: 'rating',
        text: 'Рейтинг'
    },
    {
        name: 'rules',
        text: 'Правила'
    },
    {
        name: 'about',
        text: 'Об игре'
    },
    {
        name: 'authors',
        text: 'Авторы'
    }
];

const blockClass = 'main-menu__';

class MainMenu extends Block {
    constructor() {
        super('div', ['main-menu'], {});
        this._createChildren();
        return this;
    }

    _createChildren() {
        buttons.forEach((button) => {
            this.appendChildBlock(button.name,
                new Block('button', [blockClass + button.name]).setText(button.text));
        });
    }
}

export default MainMenu;


import Block from '../block/block';

const buttons = [
    {
        name: 'play',
        text: 'Играть'
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
        name: 'authors',
        text: 'Авторы'
    }
];

const blockClass = 'main-menu__';

class MainMenu extends Block {
    constructor() {
        super('div', ['main-menu', 'element-area'], {});
        this._createChildren();
        return this;
    }

    _createChildren() {
        buttons.forEach((button) => {
            this.appendChildBlock(button.name,
                new Block('button',  [blockClass + button.name, 'light-green-but']).setText(button.text));
        });
    }

    onButtonClicked(buttonName, callback) {
        this._childBlocks[buttonName].on('click', callback);
    }
}

export default MainMenu;


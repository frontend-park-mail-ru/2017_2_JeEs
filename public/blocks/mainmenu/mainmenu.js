import Block from "../block/block"


const BUTTONS = {
    PLAY: {
        data_section: "play",
        text: "Играть"
    },
    SETTINGS: {
        data_section: "settings",
        text: "Настройки"
    },
    RATING: {
        data_section: "rating",
        text: "Рейтинг"
    },
    RULES: {
        data_section: "rules",
        text: "Правила"
    },
    ABOUT: {
        data_section: "about",
        text: "Об игре"
    },
    AUTHORS: {
        data_section: "authors",
        text: "Авторы"
    }
};

class MainMenu extends Block {
    constructor() {
        super(Block.Create("div", ["main-menu"], {})._element);
        this._createChildren();
        return this;
    }


    _createChildren() {
        let buttonsClass = "main-menu__item";

        for (let BUTTON in BUTTONS) {
            this.appendChildBlock(
                Block.Create("button", [buttonsClass, BUTTONS[BUTTON].data_section], {})
                    .setText(BUTTONS[BUTTON].text));
        }
    }

    onButtonClicked(button, callback) {
        this._element
            .getElementsByClassName(button.data_section)[0]
            .addEventListener("click", callback);
    }
}

export {MainMenu, BUTTONS};


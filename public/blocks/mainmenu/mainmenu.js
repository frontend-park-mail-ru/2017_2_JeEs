import Block from "../block/block"


const BUTTONS = {
    PLAY: {
        data_section: "main-menu__play",
        text: "Играть"
    },
    SETTINGS: {
        data_section: "main-menu__settings",
        text: "Настройки"
    },
    RATING: {
        data_section: "main-menu__rating",
        text: "Рейтинг"
    },
    RULES: {
        data_section: "main-menu__rules",
        text: "Правила"
    },
    ABOUT: {
        data_section: "main-menu__about",
        text: "Об игре"
    },
    AUTHORS: {
        data_section: "main-menu__authors",
        text: "Авторы"
    }
};

class MainMenu extends Block {
    constructor() {
        super("div", ["main-menu"], {});
        this._createChildren();
        return this;
    }

    _createChildren() {
        const buttonsClass = "main-menu__item";

        for (let BUTTON in BUTTONS) {
            this.appendChildBlock(
                new Block("button", [BUTTONS[BUTTON].data_section], {})
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


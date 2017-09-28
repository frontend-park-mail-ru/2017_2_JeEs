import Block from "../block/block"

const BUTTONS = {
    LOGIN: {
        data_section: "user-block__login",
        text: "Войти"
    },
    SIGNUP: {
        data_section: "user-block__signup",
        text: "Зарегистрироваться"
    },
    LOGOUT: {
        data_section: "user-block__logout",
        text: "Выйти"
    }
};

class UserBlock extends Block {
    constructor() {
        super("div", ["user-block"], {});
        this.logout();
        return this;
    }

    login(login) {
        this.removeAllChildren();

        this.appendChildBlock(new Block("p").setText("Привет, " + login));
        this.appendChildBlock(new Block("button", [BUTTONS.LOGOUT.data_section])
            .setText(BUTTONS.LOGOUT.text));
    }

    logout() {
        this.removeAllChildren();

        this.appendChildBlock(new Block("button", [BUTTONS.LOGIN.data_section])
            .setText(BUTTONS.LOGIN.text));
        this.appendChildBlock(new Block("button", [BUTTONS.SIGNUP.data_section])
            .setText(BUTTONS.SIGNUP.text));
    }

    onButtonClicked(button, callback) {
        this._element
            .getElementsByClassName(button.data_section)[0]
            .addEventListener("click", callback);
    }
}

export {UserBlock, BUTTONS};
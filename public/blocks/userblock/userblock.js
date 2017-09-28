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
        super(Block.Create("div", ["user-block"], {})._element);
        this._createChildren();
        return this;
    }

    _createChildren() {
        // let panel = Block.Create("div", ["user-block__panel"], {});
        // this.appendChildBlock(Block.Create("button", [BUTTONS.LOGIN.data_section], {})
        //     .setText(BUTTONS.LOGIN.text));
        // this.appendChildBlock(Block.Create("button", [BUTTONS.SIGNUP.data_section], {})
        //     .setText(BUTTONS.SIGNUP.text));
        this.logout()
    }

    login(login) {
        this.removeAllChild();

        this.appendChildBlock(Block.Create("p", [], {}).setText("Привет, " + login));
        this.appendChildBlock(Block.Create("button", [BUTTONS.LOGOUT.data_section], {})
            .setText(BUTTONS.LOGOUT.text));
    }

    logout() {
        this.removeAllChild();

        // let panel = Block.Create("div", ["user-block__panel"], {});
        this.appendChildBlock(Block.Create("button", [BUTTONS.LOGIN.data_section], {})
            .setText(BUTTONS.LOGIN.text));
        this.appendChildBlock(Block.Create("button", [BUTTONS.SIGNUP.data_section], {})
            .setText(BUTTONS.SIGNUP.text));
    }

    onButtonClicked(button, callback) {
        this._element
            .getElementsByClassName(button.data_section)[0]
            .addEventListener("click", callback);
    }

    // onSubmit(callback) {
    //     this._element.addEventListener('submit', (e) => {
    //         e.preventDefault();
    //         const formdata = {};
    //         const elements = this._element.elements;
    //         for (let name in elements) {
    //             formdata[name] = elements[name].value;
    //         }
    //
    //         callback(formdata);
    //     });
    // }

    // onButtonClicked(button) {
    //     return new Promise((resolve, reject) => {
    //         this._element
    //             .getElementsByClassName(button.data_section)[0]
    //             .addEventListener("click", (event) => {
    //                 event.preventDefault();
    //                 resolve();
    //             });
    //         debugger;
    //     });
    // }
}

export {UserBlock, BUTTONS};
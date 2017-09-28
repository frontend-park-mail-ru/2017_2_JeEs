import Block from "../block/block"

class UserBlock extends Block {
    constructor() {
        super("div", ["user-block"], {});
        this.logout();
        return this;
    }

    login(login) {
        this.removeAllChildren();

        this.appendChildBlock("user-name", new Block("a", ["user-block__user-name"]).setText("Привет, " + login));
        this.appendChildBlock("logout", new Block("button", ["user-block__logout"]).setText("Выйти"));
    }

    logout() {
        this.removeAllChildren();

        this.appendChildBlock("login", new Block("button", ["user-block__login"]).setText("Войти"));
        this.appendChildBlock("signup", new Block("button", ["user-block__signup"]).setText("Зарегистрироваться"));
    }

    onButtonClicked(buttonName, callback) {
        this._childBlocks[buttonName].on("click", callback);
    }
}

export default UserBlock;

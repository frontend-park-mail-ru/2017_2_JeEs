import Block from '../block/block';

class UserBlock extends Block {
    constructor() {
        super('div', ['user-block'], {});
        this._login = new Block('button', ['user-block__login']).setText('Войти');
        this._logout = new Block('button', ['user-block__logout']).setText('Выйти');
        this._signup = new Block('button', ['user-block__signup']).setText('Зарегистрироваться');
        this.logout();
        return this;
    }

    login(login) {
        this.removeAllChildren();
        this.appendChildBlock('user-name', new Block('a', ['user-block__user-name']).setText('Привет, ' + login));
        this.appendChildBlock('logout', this._logout);
    }

    logout() {
        this.removeAllChildren();
        this.appendChildBlock('login', this._login);
        this.appendChildBlock('signup', this._signup);
    }

    onButtonClicked(buttonName, callback) {
        this._childBlocks[buttonName].on('click', callback);
    }
}

export default UserBlock;

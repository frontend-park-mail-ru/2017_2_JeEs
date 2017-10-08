import Block from '../block/block';

export default class UserBlock extends Block {
    constructor() {
        super('div', ['user-block'], {});
        this.appendChildBlock('login', new Block('button', ['user-block__login']).setText('Войти'));
        this.appendChildBlock('signup', new Block('button', ['user-block__signup']).setText('Зарегистрироваться'));
        return this;
    }
}

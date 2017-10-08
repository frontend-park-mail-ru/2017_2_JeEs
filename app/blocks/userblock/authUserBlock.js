import Block from '../block/block';

export default class UserBlock extends Block {
    constructor(login) {
        super('div', ['user-block'], {});
        this.appendChildBlock('user-name', new Block('a', ['user-block__user-name']).setText('Привет, ' + login));
        this.appendChildBlock('logout', new Block('button', ['user-block__logout']).setText('Выйти'));
        return this;
    }
}
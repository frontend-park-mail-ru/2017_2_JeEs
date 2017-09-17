import Block from "../block/block"

class MainMenu extends Block {
	constructor() {
		super(Block.Create("div", ["main-menu-block__main-menu"], {})._element);
		this._createChildren();
		return this;
	}

	_createChildren() {
		let buttonsClass = "main-menu-block__main-menu__item";
		let buttons = ["Играть", "Настройки", "Рейтинг", "Правила", "Об игре"];

		for (let key in buttons) {
			this.append(Block.Create("button", [buttonsClass], {}).setText(buttons[key]));
		}
	}
}

export default MainMenu;

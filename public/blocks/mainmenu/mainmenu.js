import Block from "../block/block"

class MainMenu extends Block {
	constructor() {
		super(Block.Create("div", ["main-menu"], {})._element);
		this._createChildren();
		return this;
	}

	_createChildren() {
		let buttonsClass = "main-menu__item";
		let buttons = ["Играть", "Настройки", "Рейтинг", "Правила", "Об игре"];

		for (let key in buttons) {
			this.appendChild(Block.Create("button", [buttonsClass], {}).setText(buttons[key]));
		}
	}

	onButtonClicked(buttonId, callback) {
		if (buttonId < this._element.childNodes.length) {
			this._element.childNodes[buttonId].addEventListener("click", callback);
		}
	}
}

export default MainMenu;

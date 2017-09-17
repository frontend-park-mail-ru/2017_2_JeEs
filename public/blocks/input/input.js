import Block from "../block/block"

class Input extends Block {
	static Create(type = "text", classes = [], attrs = {}) {
		const element = document.createElement("input");
		element.type = type;
		classes.forEach((className) => {
			element.classList.add(className);
		});
		for (let name in attrs) {
			element.setAttribute(name, attrs[name]);
		}
		return new Input(element);
	}

	setValue(value) {
		this._element.value = value;
	}

	getValue() {
		return +this._element.value;
	}

	setDisabled(isDisabled) {
		this._element.disabled = isDisabled;
	}
}

export default Input;

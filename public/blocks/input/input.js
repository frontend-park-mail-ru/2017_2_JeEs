import Block from "../block/block"

class Input extends Block {
	constructor(type = "text", classes = [], attrs = {}) {
		attrs["type"] = type;
		super("input", classes, attrs);
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

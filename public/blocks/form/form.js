import Block from "../block/block"

class Form extends Block {
	constructor(fields = [], classes = []) {

		super(Block.Create("form",  classes)._element);

		fields.forEach((field) => {
			this.appendChild(field);
		});
	}

	onSubmit(callback) {
		this._element.addEventListener('submit', () => {
			this._element.preventDefault();
			const formdata = {};
			const elements = this._element.elements;
			for (let name in elements) {
				formdata[name] = elements[name].value;
			}

			callback(formdata);
		});
	}

	reset() {
		this._element.reset();
	}
}

export default Form;

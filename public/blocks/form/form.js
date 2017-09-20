import Block from "../block/block"
import Input from "../input/input"

class Form extends Block {
	constructor(fieldPrototypes = [], classes = {}, submitText = "", hrefText = "") {
		const fields = [];
		fieldPrototypes.forEach((fieldPrototype) => {
			fields.push(Input.Create(fieldPrototype.type, [classes.fieldClass], {
				name: fieldPrototype.name,
				placeholder: fieldPrototype.placeholder,
				required: "required"
			}));
		});

		fields.push(Input.Create("submit", [classes.submitClass], { value: submitText }));
		fields.push(Block.Create("a", [], { href: "" }).setText(hrefText));

		super(Block.Create("form",  [classes.formClass])._element);

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

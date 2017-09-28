import Block from "../block/block"
import Input from "../input/input"
import Validation from "./validation/validation"

class Form extends Block {
    constructor(title = "", fieldPrototypes = [], refPrototype = {}) {
        super("form", ["form"]);

        this.appendChildBlock("title", new Block("h4", ["form__title"]).setText(title));

        fieldPrototypes.forEach((fieldPrototype) => {
            this.appendChildBlock(fieldPrototype.attributes.name,
                new Input(fieldPrototype.type, ["form__field"], fieldPrototype.attributes));
        });

        this.appendChildBlock("ref", new Block("a", ["form__ref"], refPrototype.attributes).setText(refPrototype.text));
        this._message = new Block("p", ["form__message"]);
        this.appendChildBlock("message", this._message);

        Validation.loginValidation(this._element.getElementsByClassName("form__field")[0],(message) => this.message(message))
    };


    onSubmit(callback) {
        this.on('submit', (event) => {
            event.preventDefault();
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

    message(errorText) {
        this._message.setText(errorText)
    }
}

export default Form;

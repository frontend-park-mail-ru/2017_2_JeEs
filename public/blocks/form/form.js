import Block from "../block/block"
import Input from "../input/input"
import Validation from "./validation/validation"

class Form extends Block {
    constructor(title = "", fieldPrototypes = [], refPrototype = {}) {
        super(Block.Create("form", ["form"])._element);

        this.appendChildBlock(Block.Create("h4", ["form__title"], {}).setText(title));

        fieldPrototypes.forEach((fieldPrototype) => {
            this.appendChildBlock(Input.Create(fieldPrototype.type, ["form__field"], fieldPrototype.attributes));
        });

        this._ref = Block.Create("a", ["form__ref"], refPrototype.attributes);
        this.appendChildBlock(this._ref.setText(refPrototype.text));

        this._message = Block.Create("p", ["form__message"]);
        this.appendChildBlock(this._message);

        Validation.loginValidation(this._element.getElementsByClassName("form__field")[0])
            .then((err) => this.message(err))
    };


    onSubmit(callback) {
        this._element.addEventListener('submit', (e) => {
            e.preventDefault();
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

    // onRef(callback) {
    //     this._element.getElementsByClassName("form__ref")[0]
    //         .addEventListener("click", (event) => {
    //             event.preventDefault();
    //             callback();
    //         });
    // }

    onRef() {
        return new Promise((resolve, reject) => {
            this._ref._element.addEventListener("click", (event) => {
                event.preventDefault();
                resolve();
            });
        });
    }

    message(errorText) {
        this._message.setText(errorText)
    }
}

export default Form;

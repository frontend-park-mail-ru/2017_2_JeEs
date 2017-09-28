import Block from "../block/block"
import Input from "../input/input"

class Form extends Block {
    constructor(title = "", fieldPrototypes = [], refPrototype = {}) {
        super("form", ["form"]);

        this.appendChildBlock("title", new Block("h4", ["form__title"]).setText(title));

        fieldPrototypes.forEach((fieldPrototype) => {
            this.appendChildBlock(fieldPrototype.attributes.name,
                new Input(fieldPrototype.type, ["form__field"], fieldPrototype.attributes));
        });

        this.appendChildBlock("ref", new Block("a", ["form__ref"], refPrototype.attributes).setText(refPrototype.text));
    }

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
    //
    // onRef() {
    //     return new Promise((resolve, reject) => {
    //         this._element.getElementsByClassName("form__ref")[0]
    //             .addEventListener("click", (event) => {
    //                 event.preventDefault();
    //                 resolve()
    //             });
    //     });
    // }
}

export default Form;

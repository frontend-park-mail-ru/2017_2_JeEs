import Block from '../block/block';
import Input from '../input/input';

class Form extends Block {
    constructor(title = '', fieldPrototypes = [], refPrototype = {}) {
        super('form', ['form']);

        this.appendChildBlock('title', new Block('h4', ['form__title']).setText(title));

        fieldPrototypes.forEach((fieldPrototype) => {
            this.appendChildBlock(fieldPrototype.attributes.name,
                new Input(fieldPrototype.type, fieldPrototype.styleClass, fieldPrototype.attributes));
        });

        this.appendChildBlock('ref', new Block('a', refPrototype.styleClass, refPrototype.attributes).setText(refPrototype.text));
        this._message = new Block('span', ['form__message']);
        this.appendChildBlock('message', this._message);
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

    message(errorText) {
        this._message.setText(errorText);
    }
}

export default Form;

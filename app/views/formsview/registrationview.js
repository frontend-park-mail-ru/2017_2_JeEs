import BaseView from '../baseview';
import Form from '../../blocks/form/form';
import * as registrationFormConfig from '../../configs/registrationformfields';


export default class RegistrationView extends BaseView {
    constructor(parent) {
        super(parent);
        this.eventBus.on('main-block:registration-form', () => {
            this.create()
        });
    }

    create() {
        const form = new Form(
            registrationFormConfig.title,
            registrationFormConfig.fieldPrototypes,
            registrationFormConfig.refPrototype
        );
        this.parent.appendChildBlock('main-block', form);


        form.getChildBlock('ref').on('click', (event) => {
            this._onRef(event)
        });
    }

    _onRef() {
        event.preventDefault();
        this.destroy();
        this.eventBus.emit('main-block:auth-form')
    }

    // destroy() {
    //     this.parent.removeAllChildren();
    // }
}
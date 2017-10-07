import BaseView from '../baseview';
import Form from '../../blocks/form/form';
import * as registrationFormConfig from '../../configs/authformfields';



export default class RegistrationView extends BaseView {
    constructor(parent) {
        super(parent);
        this.eventBus.on('main-block:registration-form', this.create());
    }

    create() {
        const form = new Form(
            registrationFormConfig.title,
            registrationFormConfig.fieldPrototypes,
            registrationFormConfig.refPrototype
        );
        this.parent.appendChildBlock('main-block', form);
    }

    destroy() {
        this.parent.removeAllChildren();
    }
}
import BaseView from '../baseview';
import Form from '../../blocks/form/form';
import * as authFormConfig from '../../configs/authformfields';


export default class AuthView extends BaseView {
    constructor(parent) {
        super(parent);
        this.eventBus.on('main-block:auth-form', () => {
            this.create()
        });
    }

    create() {
        const form = new Form(
            authFormConfig.title,
            authFormConfig.fieldPrototypes,
            authFormConfig.refPrototype
        );
        this.parent.appendChildBlock('main-block', form);
    }

    destroy() {
        this.parent.removeAllChildren();
    }
}
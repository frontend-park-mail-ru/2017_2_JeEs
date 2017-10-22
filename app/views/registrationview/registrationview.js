import BaseView from '../baseview';
import * as registrationFormConfig from '../../configs/registrationformfields';
import validate from '../../services/specifiedvalidation/registrationvalidator';


export default class RegistrationView extends BaseView {
    constructor(parent) {
        super(parent);

        this.blockName = 'registration-form';
        this.block = new Form(
            registrationFormConfig.title,
            registrationFormConfig.fieldPrototypes,
            registrationFormConfig.refPrototype
        );

        this.block.getChildBlock('ref').on('click', (event) => {
            this._onRef(event)
        });

        this.block.onSubmit((formdata) => {
            this._onSubmit(formdata);
        });

        this.eventBus.on('main-block:registration-form', () => {
            this.create()
        });

        this.eventBus.on('main-block:registration-form-rm', () => {
            this.destroyAll();
            this.create()
        });
    }

    _onRef() {
        event.preventDefault();
        this.destroy();
        this.eventBus.emit('main-block:auth-form')
    }

    _onSubmit(formdata) {
        const authValidation = validate(formdata.email, formdata.login, formdata.password, formdata.passwordConfirm);
        if (authValidation !== null) {
            this.block.message(authValidation);
            return;
        }
        this.userService.signup(formdata.email, formdata.login, formdata.password)
            .then(() => this.block.reset())
            .then(() => {
                this.destroy();
                this.eventBus.emit('main-block:main-menu')
            })
            .then(() => this.userService.getData())
            .then(() => {
                this.eventBus.emit('user-block:auth')
            })

            .catch((err) => {
                this.block.message(err.error);
            });
    }
}
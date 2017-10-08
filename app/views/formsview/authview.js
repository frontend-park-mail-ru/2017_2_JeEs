import BaseView from '../baseview';
import Form from '../../blocks/form/form';
import * as authFormConfig from '../../configs/authformfields';
import validate from '../../services/specifiedvalidation/authvalidator';


export default class AuthView extends BaseView {
    constructor(parent) {
        super(parent);
        this.blockName = 'auth-form';
        this.block = new Form(
            authFormConfig.title,
            authFormConfig.fieldPrototypes,
            authFormConfig.refPrototype
        );

        this.block.getChildBlock('ref').on('click', (event) => {
            this._onRef(event)
        });

        this.block.onSubmit((formdata) => {
            this._onSubmit(formdata);
        });

        this.eventBus.on('main-block:auth-form', () => {
            this.create()
        });

        this.eventBus.on('main-block:auth-form-rm', () => {
            this.destroyAll();
            this.create()
        });
    }

    _onRef(event) {
        event.preventDefault();
        this.destroy();
        this.eventBus.emit('main-block:registration-form')
    }

    _onSubmit(formdata) {
        const resultValidation = validate(formdata.login, formdata.password);
        if (resultValidation !== null) {
            this.block.message(resultValidation);
            return;
        }
        this.userService.login(formdata.login, formdata.password)
            .then(() => this.block.reset())
            .then(() => {
                this.destroy();
                this.eventBus.emit('main-block:main-menu')
            })
            .then(() => this.userService.getData())
            .then(() => {
                this.eventBus.emit('user-block:auth')
            })

            .catch((err) => this.block.message(err.error));


    }
}
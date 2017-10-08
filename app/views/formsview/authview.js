import BaseView from '../baseview';
import Form from '../../blocks/form/form';
import * as authFormConfig from '../../configs/authformfields';
import validate from '../../services/specifiedvalidation/authvalidator';


export default class AuthView extends BaseView {
    constructor(parent) {
        super(parent);
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
    }

    create() {
        this.parent.appendChildBlock('main-block', this.block);
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
            })            .then(() => this.userService.getData())
            // .then(() => userBlock.login(formdata.login))
            // .then(() => userBlock.getChildBlock('logout').on('click', () => {
            //     this.userService.logout()
            //         .then(() => userBlock.logout());
            // }))
            .catch((err) => this.block.message(err.error));


    }
}
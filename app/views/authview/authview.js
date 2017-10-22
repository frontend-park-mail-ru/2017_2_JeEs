import BaseView from '../baseview';
import validate from '../../services/specifiedvalidation/authvalidator';
import Router from '../../modules/router'


export default class AuthView extends BaseView {
    constructor(parent) {
        super(parent);
        this.template = require('./auth.pug');

        this.form = null;
        this.formErrorTextString = null;

        this.formfields = ['login', 'password'];
    }

    formReset() {
        this.form.reset();
    }

    formError(errorText) {
        this.formErrorTextString.textContent = errorText;
    }


    _createFirst() {
        this.form = this.element.querySelector('.auth-form__form');
        this.formErrorTextString = this.element.querySelector('.form__message');

        this.form.addEventListener('submit', (formdata) => {
            event.preventDefault();
            this._onSubmit();
        });
    }

    _onSubmit() {
        debugger;
        const formdata = {};
        const elements = this.form.elements;
        for (let name in elements) {
            formdata[name] = elements[name].value;
        }

        const resultValidation = validate(formdata.login, formdata.password);
        if (resultValidation !== null) {
            this.formError(resultValidation);
            return;
        }
        this.userService.login(formdata.login, formdata.password)
            .then(() => this.formReset())
            .then(() => this.userService.getData())
            .then(() => {
                this.eventBus.emit('user-block:auth')
            })
            .then(() => {
                debugger;
                (new Router()).go('/'); //костыль
            })

            .catch((err) => this.formError(err.error));
    }
}
import BaseView from '../../baseview';
import validate from '../../../services/validation/authvalidator';
import Router from '../../../modules/router'


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


    create() {
        this.element.innerHTML = this.template({});
        this.form = this.element.querySelector('.auth-form__form');
        this.formErrorTextString = this.element.querySelector('.form__message');

        this.form.addEventListener('submit', (formdata) => {
            event.preventDefault();
            this._onSubmit();
        });
    }

    _onSubmit() {
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
            .then(() => {
                this.formReset();
                this.eventBus.emit('user-block:auth');
                (new Router()).go('/')
            })

            .catch((err) => this.formError(err.error));
    }
}
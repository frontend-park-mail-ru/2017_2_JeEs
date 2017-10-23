import BaseView from '../../baseview';
import validate from '../../../services/validation/registrationvalidator';
import Router from '../../../modules/router'


export default class RegistrationView extends BaseView {
    constructor(parent) {
        super(parent);
        this.template = require('./registration.pug');

        this.form = null;
        this.formErrorTextString = null;

        this.formfields = ['email', 'login', 'password', 'passwordConfirm'];
    }

    formReset() {
        this.form.reset();
    }

    formError(errorText) {
        this.formErrorTextString.textContent = errorText;
    }


    create() {
        this.element.innerHTML = this.template({});
        this.form = this.element.querySelector('.registration-form__form');
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

        const authValidation = validate(formdata.email, formdata.login, formdata.password, formdata.passwordConfirm);
        if (authValidation !== null) {
            this.formError(authValidation);
            return;
        }

        this.userService.signup(formdata.email, formdata.login, formdata.password)
            .then(() => {
                this.formReset();
                this.eventBus.emit('user-block:auth');
                (new Router()).go('/')
            })

            .catch((err) => this.formError(err.error));
    }
}
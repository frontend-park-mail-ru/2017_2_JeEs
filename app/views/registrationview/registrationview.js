import BaseView from '../baseview';
import validate from '../../services/specifiedvalidation/registrationvalidator';


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


    _createFirst() {
        this.form = this.element.querySelector('.registration-form__form');
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

        const authValidation = validate(formdata.email, formdata.login, formdata.password, formdata.passwordConfirm);
        if (authValidation !== null) {
            this.formError(authValidation);
            return;
        }
        this.userService.signup(formdata.email, formdata.login, formdata.password)
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
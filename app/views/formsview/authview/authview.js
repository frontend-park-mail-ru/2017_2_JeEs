import BaseView from '../../baseview';
import validate from '../../../services/validation/authvalidator';
import Router from '../../../modules/router';


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

        this.form.addEventListener('submit', () => {
            event.preventDefault();
            this._onSubmit();
        });

        this.backButton = this.element.querySelector('.main-block__back-in-form');

        this.backButton.addEventListener('click', (event) => {
            event.preventDefault();
            (new Router()).back();
        });
    }

    _onSubmit() {
        const formData = {};
        const elements = this.form.elements;
        for (let field in elements) {
            if (elements[field].nodeName === 'INPUT') {
                formData[elements[field].name] = elements[field].value;
            }
        }

        const resultValidation = validate(formData.login, formData.password);
        if (resultValidation !== null) {
            this.formError(resultValidation);
            return;
        }
        this.userService.login(formData.login, formData.password)
            .then(() => {
                this.formReset();
                this.eventBus.emit('user-block:auth');
                (new Router()).go('/');
            })

            .catch((err) => this.formError(err.error));
    }
}
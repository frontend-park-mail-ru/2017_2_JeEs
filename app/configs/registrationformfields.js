const title = 'Регистрация';

const fieldPrototypes = [
    {
        type: 'text',
        styleClass: "form__field",
        attributes: {
            name: 'login',
            placeholder: 'Логин'
        }
    },
    {
        type: 'text',
        styleClass: "form__field",
        attributes: {
            name: 'email',
            placeholder: 'Email',
        }
    },
    {
        type: 'password',
        styleClass: "form__field",
        attributes: {
            name: 'password',
            placeholder: 'Пароль'
        }
    },
    {
        type: 'password',
        styleClass: "form__field",
        attributes: {
            name: 'passwordConfirm',
            placeholder: 'Подтверждение пароля'
        }
    },
    {
        type: 'submit',
        styleClass: "form__submit",
        attributes: {
            value: 'Регистрация'
        }
    }
];

const refPrototype = {
    text: 'У меня уже есть аккаунт',
    styleClass: "form__ref",
    attributes: {
        href: '',
    }
};


export {title, fieldPrototypes, refPrototype};

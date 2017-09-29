const title = 'Регистрация';

const fieldPrototypes = [
    {
        type: 'text',
        attributes: {
            name: 'login',
            placeholder: 'Логин'
        }
    },
    {
        type: 'text',
        attributes: {
            name: 'email',
            placeholder: 'Email',
        }
    },
    {
        type: 'password',
        attributes: {
            name: 'password',
            placeholder: 'Пароль'
        }
    },
    {
        type: 'password',
        attributes: {
            name: 'passwordConfirm',
            placeholder: 'Подтверждение пароля'
        }
    },
    {
        type: 'submit',
        attributes: {
            value: 'Регистрация'
        }
    }
];

const refPrototype = {
    text: 'У меня уже есть аккаунт',
    attributes: {
        href: '',
    }
};


export {title, fieldPrototypes, refPrototype};

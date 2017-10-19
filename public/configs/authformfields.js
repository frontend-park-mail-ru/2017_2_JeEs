const title = 'Вход';

const fieldPrototypes = [
    {
        type: 'text',
        styleClass: 'form__field',
        attributes: {
            name: 'login',
            placeholder: 'Логин'
        },
    },
    {
        type: 'password',
        styleClass: 'form__field',
        attributes: {
            name: 'password',
            placeholder: 'Пароль'
        }
    },
    {
        type: 'submit',
        styleClass: 'big-green-but',
        attributes: {
            value: 'Вход'
        }
    }
];

const refPrototype = {
    text: 'Создать аккаунт',
    attributes: {
        href: '',
    }
};


export {title, fieldPrototypes, refPrototype};

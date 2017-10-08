import Validation from '../../blocks/form/validation/validation';

/**
 * @function RegistrationValidate
 * @return {string || null} возвращает null если ошибок нет
 */
function RegistrationValidate(email, login, password, password_confirm) {
    let errors = [];
    const emailValidation = Validation.validateEmail(email);
    if (emailValidation !== true) {
        errors.push({field: 'email', error: emailValidation});
    }

    const loginValidation = Validation.validateLogin(login);
    if (loginValidation !== true) {
        errors.push({field: 'password', error: loginValidation});
    }

    const passwordValidation = Validation.validatePassword(password);
    if (passwordValidation !== true) {
        errors.push({field: 'password', error: passwordValidation});
    }

    if (password !== password_confirm) {
        errors.push({field: 'passwordConfirm', error: 'Пароли не совпадают'});
    }

    if (errors.length === 0) {
        return null;
    }

    return errors
        .map(item => item.error)
        .join('\n');
}

export default RegistrationValidate;
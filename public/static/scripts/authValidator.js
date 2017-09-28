import Validation from "../utils/validations"

function AuthValidate(email, login, password, password_confirm) {

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
        errors.push({field: 'password-confirm', error: "Пароли не совпадают"});
    }
}

export default AuthValidate
const MAX_LOGIN_LENGTH = 30;
const MIN_LOGIN_LENGTH = 3;

const MAX_EMAIL_LENGTH = 30;
const MIN_EMAIL_LENGTH = 3;

const MAX_PASSWORD_LENGTH = 30;
const MIN_PASSWORD_LENGTH = 4;

class Validate {
    static validatePassword(password) {
        if ((password.length < MIN_PASSWORD_LENGTH) || (password.length > MAX_PASSWORD_LENGTH)) {
            return 'Пароль должен быть от ' + MIN_PASSWORD_LENGTH + ' до ' + MAX_PASSWORD_LENGTH + ' символов.';
        }
        return true;
    }

    static validateEmail(email) {
        if (!email.match(/@/)) {
            return 'Неправильный формат email-а';
        }

        if ((email.length < MIN_EMAIL_LENGTH) || (email.length > MAX_EMAIL_LENGTH)) {
            return 'Email должен быть от ' + MIN_EMAIL_LENGTH + ' до ' + MAX_EMAIL_LENGTH + ' символов.';
        }
        return true;
    }

    static validateLogin(login) {
        if ((login.length < MIN_LOGIN_LENGTH) || (login.length > MAX_LOGIN_LENGTH)) {
            return 'Логин должен быть от ' + MIN_LOGIN_LENGTH + ' до ' + MAX_LOGIN_LENGTH + ' символов.';
        }

        return true;
    }
}

export default Validate
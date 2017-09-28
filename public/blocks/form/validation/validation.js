// const authForm = document.getElementById('auth-form');
//
// const password = authForm.elements['password'];
// const repeatPassword = authForm.elements['repeat-password'];
// password.addEventListener('focusout', event => {
//     if (password.value.length < 8) {
//         alert("Слишком короткий пароль! Введите не менее 8 символов")
//     }
//     if (password.value && repeatPassword.value && password.value !== repeatPassword.value) {
//         alert("Пароли не совпадают");
//     }
// });
// repeatPassword.addEventListener('focusout', event => {
//     if (repeatPassword.value.length < 8) {
//         alert("Слишком короткий пароль! Введите не менее 8 символов")
//     }
//     if (password.value && repeatPassword.value && password.value !== repeatPassword.value) {
//         alert("Пароли не совпадают");
//     }
// });
//
// const username = authForm.elements['username'];
// username.addEventListener('focusout', event => {
//     if (username.value.length < 6) {
//         alert("Логин должен быть не менее 6 символов")
//     }
// });
//
// const email = authForm.elements['email'];
// email.addEventListener('focusout', event => {
//
// });
class Validation {

    static emailValidation(emailField, callback) {

        emailField.addEventListener('focusout', event => {
            if (!emailField.value.match(/@/)) {
                callback('Wrong email format');
                return
            }
            callback("")
        });
    }

    static loginValidation(loginField, callback) {
        loginField.addEventListener('focusout', event => {
            if (loginField.value.length < 6) {
                callback("Логин должен быть не менее 6 символов")
                return
            }
            callback("")
        });
    }

    static passwordValidation(passwordField) {

    }

    static repeatPasswordValidation(passwordField, repeatPasswordField) {

    }
}


export default Validation;
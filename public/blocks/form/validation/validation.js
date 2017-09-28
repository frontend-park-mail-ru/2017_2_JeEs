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

function emailValidation(emailField) {
    return new Promise((resolve, reject) => {
        emailField.addEventListener('focusout', event => {
            if (!emailField.value.match(/@/)) {
                resolve("Введите корректный email")
            }
            resolve(" ");
        });
    });
}

function loginValidation(loginField) {
    return new Promise((resolve, reject) => {
        loginField.addEventListener('focusout', event => {
            if (loginField.value.length < 6) {
                resolve("Логин должен быть не менее 6 символов")
            }
            resolve(" ");
        });
    });
}

function passwordValidation(passwordField) {

}

function repeatPasswordValidation(passwordField, repeatPasswordField) {

}

module.exports = {
    validatePassword,
    validateEmail
};

export default Validation;
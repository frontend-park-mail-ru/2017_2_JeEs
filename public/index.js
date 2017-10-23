import Block from './blocks/block/block';
import SoundBlock from './blocks/soundblock/soundblock';
import UserBlock from './blocks/userblock/userblock';
import MainMenu from './blocks/mainmenu/mainmenu';
import Form from './blocks/form/form';
import UserService from './services/user-service';
import * as authFormConfig from './configs/authformfields';
import * as registrationFormConfig from './configs/registrationformfields';
import RatingBlock from './blocks/ratingblock/rating';
import AuthValidate from './blocks/specifiedvalidation/authValidator';
import loginValidate from './blocks/specifiedvalidation/loginValidator';

const userService = new UserService();

const root = new Block(document.getElementById('root'));

const topBar = new Block('div', ['top-bar']);
root.appendChildBlock('topbar', topBar);
topBar.appendChildBlock('sound-block', new SoundBlock());

const userBlock = new UserBlock();
topBar.appendChildBlock('user-block', userBlock);
// userService.isLoggedIn()
//     .then(() => userBlock.login())
//     .catch((err) => userBlock.logout());

const gameNameBlock = new Block('div', ['game-name-block']);
root.appendChildBlock('game-name-block', gameNameBlock);
gameNameBlock.appendChildBlock('game-name', new Block('h1', ['game-name-block__game-name']).setText('Quoridor'));

const mainBlock = new Block('div', ['main-block']);
root.appendChildBlock('main-block', mainBlock);

const ratingBlock = new RatingBlock(['user1', 'user2wdwefwef', 'user3', 'user4']);

mainBlock.switch = (toName, to) => {
    mainBlock.removeAllChildren();
    mainBlock.appendChildBlock(toName, to);

};

const mainMenu = new MainMenu();

gameNameBlock.getChildBlock('game-name').on('click', () => {
    mainBlock.switch('main-block', mainMenu);
});

const authForm = new Form(
    authFormConfig.title,
    authFormConfig.fieldPrototypes,
    authFormConfig.refPrototype);


authForm.onSubmit((formdata) => {
    const resultValidation = loginValidate(formdata.login, formdata.password);
    if (resultValidation !== null) {
        authForm.message(resultValidation);
        return;
    }
    userService.login(formdata.login, formdata.password)
        .then(() => authForm.reset())
        .then(() => mainBlock.switch('main-menu', mainMenu))
        .then(() => userService.getData())
        .then(() => userBlock.login(formdata.login))
        .then(() => userBlock.getChildBlock('logout').on('click', () => {
            userService.logout()
                .then(() => userBlock.logout());
        }))
        .catch((err) => authForm.message(err.error));

});

authForm.getChildBlock('ref').on('click', (event) => {
    event.preventDefault();
    mainBlock.switch('registration-from', registrationForm);
});

const registrationForm = new Form(
    registrationFormConfig.title,
    registrationFormConfig.fieldPrototypes,
    registrationFormConfig.refPrototype
);

registrationForm.onSubmit((formdata) => {
    const authValidation = AuthValidate(formdata.email, formdata.login, formdata.password, formdata.passwordConfirm);
    if (authValidation !== null) {
        registrationForm.message(authValidation);
        return;
    }
    userService.signup(formdata.email, formdata.login, formdata.password)
        .then(() => registrationForm.reset())
        .then(() => mainBlock.switch('main-menu', mainMenu))
        .then(() => userService.getData())
        .then(() => userBlock.login(formdata.login))
        .then(() => userBlock.getChildBlock('logout').on('click', () => {
            userService.logout()
                .then(() => userBlock.logout());
        }))
        .catch((err) => {
            registrationForm.message(err.error);
        });
});

registrationForm.getChildBlock('ref').on('click', (event) => {
    event.preventDefault();
    mainBlock.switch('auth-form', authForm);

});

mainMenu.getChildBlock('play').on('click', () => {
    userService.isLoggedIn()
        .then(() => alert('Когда-нибудь тут будет игра'))
        .catch(() => mainBlock.switch('auth-form', authForm));

});

mainBlock.appendChildBlock('main-menu', mainMenu);

userBlock.getChildBlock('login').on('click', () => {
    mainBlock.switch('auth-form', authForm);
});

userBlock.getChildBlock('signup').on('click', () => {
    mainBlock.switch('registration-form', registrationForm);
});

mainMenu.getChildBlock('rating').on('click', () => {
    mainBlock.switch('rating-block', ratingBlock);
});

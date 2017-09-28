import Block from "./blocks/block/block";
import SoundBlock from "./blocks/soundblock/soundblock";
import UserBlock from "./blocks/userblock/userblock";
import MainMenu from "./blocks/mainmenu/mainmenu";
import Form from "./blocks/form/form";
import UserService from "./services/user-service"
import * as authFormConfig from "./configs/authformfields";
import * as registrationFormConfig from "./configs/registrationformfields";

const root = new Block(document.getElementById("root"));

const topBar = new Block('div', ['top-bar']);
root.appendChildBlock("topbar", topBar);
topBar.appendChildBlock("sound-block", new SoundBlock());

const userBlock = new UserBlock();
topBar.appendChildBlock("user-block", userBlock);

const gameNameBlock = new Block('div', ['game-name-block']);
root.appendChildBlock("game-name-block", gameNameBlock);
gameNameBlock.appendChildBlock("game-name", new Block("h1", ["game-name-block__game-name"]).setText("Quoridor"));


const mainBlock = new Block('div', ['main-block']);
root.appendChildBlock("main-block", mainBlock);

mainBlock.switch = (toName, to) => {
    mainBlock.removeAllChildren();
    mainBlock.appendChildBlock(toName, to);

};

const mainMenu = new MainMenu();

const userService = new UserService();

const authForm = new Form(
    authFormConfig.title,
    authFormConfig.fieldPrototypes,
    authFormConfig.refPrototype);


authForm.onSubmit((formdata) => {
    userService.login(formdata.login, formdata.password)
        .then(() => authForm.reset())
        .then(() => mainBlock.switch(mainMenu))
        .then(() => userService.getData())
        .then(() => userBlock.login(formdata.login))
        .catch((err) => authForm.message(err.error));

});

authForm.getChildBlock("ref").on("click", (event) => {
    event.preventDefault();
    mainBlock.switch("registration-from", registrationForm);
});

const registrationForm = new Form(
    registrationFormConfig.title,
    registrationFormConfig.fieldPrototypes,
    registrationFormConfig.refPrototype
);

registrationForm.onSubmit((formdata) => {
    userService.signup(formdata.email, formdata.login, formdata.password)
        .then(() => registrationForm.reset())
        .then(() => mainBlock.switch(mainMenu))
        .then(() => userService.getData())
        .then(() => userBlock.login(formdata.login))
        .catch((err) => {registrationForm.message(err.error)});
});

registrationForm.getChildBlock("ref").on("click", (event) => {
    event.preventDefault();
    mainBlock.switch("auth-form", authForm);

});

mainMenu.getChildBlock("play").on("click", () => {
    if (userService.isLoggedIn()) {
        alert("Когда-нибудь тут будет игра");
        return;
    }
    mainBlock.switch("auth-form", authForm);

});

mainBlock.appendChildBlock("main-menu", mainMenu);

userBlock.getChildBlock("login").on("click", () => {
    mainBlock.switch("auth-form", authForm);
});

userBlock.getChildBlock("signup").on("click", () => {
    mainBlock.switch("registration-form", registrationForm);
});

// userBlock.onButtonClicked("logout", () => {
//         userService.logout()
//             .then(() => userBlock.logout())
//             .catch((err) => alert(`Some error ${err.status}: ${err.responseText}`))
// });


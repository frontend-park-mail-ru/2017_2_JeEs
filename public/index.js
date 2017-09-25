import Block from "./blocks/block/block";
import SoundBlock from "./blocks/soundblock/soundblock";
import * as UserBlock from "./blocks/userblock/userblock";
import * as MenuBlock from "./blocks/mainmenu/mainmenu";
import Form from "./blocks/form/form";
import UserService from "./services/user-service"
import * as authFormConfig from "./configs/authformfields";
import * as registrationFormConfig from "./configs/registrationformfields";

const root = new Block(document.getElementById("root"));

const topBar = Block.Create('div', ['top-bar']);
root.appendChildBlock(topBar);
topBar.appendChildBlock(new SoundBlock());

const gameNameBlock = Block.Create('div', ['game-name-block']);
root.appendChildBlock(gameNameBlock);
gameNameBlock.appendChildBlock(Block.Create("h1", ["game-name-block__game-name"], {}).setText("Quoridor"));


const mainBlock = Block.Create('div', ['main-block']);
root.appendChildBlock(mainBlock);

mainBlock.switch = (to) => {
    mainBlock.removeAllChild();
    mainBlock.appendChildBlock(to);
};

const mainMenu = new MenuBlock.MainMenu();

const userService = new UserService();

const userBlock = new UserBlock.UserBlock();

const authForm = new Form(
    authFormConfig.title,
    authFormConfig.fieldPrototypes,
    authFormConfig.refPrototype);


authForm.onSubmit(function (formdata) {
    userService.login(formdata.login, formdata.password)
        .then(() => authForm.reset())
        .then(() => mainBlock.switch(mainMenu))
        .then(() => userService.getData())
        .then(() => userBlock.login(formdata.login))
        .catch((err) => alert(`Some error ${err.status}: ${err.responseText}`));
});

authForm.onRef(() => {
    mainBlock.switch(registrationForm);
});

// authForm.onRef()
//     .then(() => mainBlock.switch(registrationForm));
//
// registrationForm.onRef()
//     .then(() => mainBlock.switch(authForm));


const registrationForm = new Form(
    registrationFormConfig.title,
    registrationFormConfig.fieldPrototypes,
    registrationFormConfig.refPrototype
);

registrationForm.onSubmit(function (formdata) {
    userService.signup(formdata.email, formdata.login, formdata.password)
        .then(() => registrationForm.reset())
        .then(() => mainBlock.switch(mainMenu))
        .then(() => userService.getData())
        .then(() => userBlock.login(formdata.login))
        .catch((err) => alert(`Some error ${err.status}: ${err.responseText}`));
});

registrationForm.onRef(() => {
    mainBlock.switch(authForm);
});


mainMenu.onButtonClicked(MenuBlock.BUTTONS.PLAY, () => {
    if (userService.isLoggedIn()) {
        alert("Когда-нибудь тут будет игра");
        return
    }
    mainBlock.switch(authForm);
});

mainBlock.appendChildBlock(mainMenu);


topBar.appendChildBlock(userBlock);

userBlock.onButtonClicked(UserBlock.BUTTONS.LOGIN, () => {
        mainBlock.switch(authForm);
    }
);

userBlock.onButtonClicked(UserBlock.BUTTONS.SIGNUP, () => {
        mainBlock.switch(registrationForm);
    }
);

userBlock.onButtonClicked(UserBlock.BUTTONS.LOGOUT, () => {
        userService.logout()
            .then(() => userBlock.logout())
            .catch((err) => alert(`Some error ${err.status}: ${err.responseText}`))
    }
);
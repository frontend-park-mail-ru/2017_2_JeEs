import Block from "./blocks/block/block";
import SoundBlock from "./blocks/soundblock/soundblock";
import UserBlock from "./blocks/userblock/userblock";
import * as MenuBlock from "./blocks/mainmenu/mainmenu";
import Form from "./blocks/form/form";
import UserService from "./services/user-service"
import * as authFormConfig from "./configs/authformfields";
import * as registrationFormConfig from "./configs/registrationformfields";

const root = new Block(document.getElementById("root"));

const topBar = Block.Create('div', ['top-bar']);
root.appendChildBlock(topBar);
topBar.appendChildBlock(new SoundBlock());
topBar.appendChildBlock(new UserBlock());


const gameNameBlock = Block.Create('div', ['game-name-block']);
root.appendChildBlock(gameNameBlock);
gameNameBlock.appendChildBlock(Block.Create("h1", ["game-name-block__game-name"], {}).setText("Quoridor"));


const mainBlock = Block.Create('div', ['main-block']);
root.appendChildBlock(mainBlock);

mainBlock.switch = (from, to) => {
    mainBlock.removeChildBlock(from);
    mainBlock.appendChildBlock(to);
};

const mainMenu = new MenuBlock.MainMenu();

const userService = new UserService();

const authForm = new Form(
    authFormConfig.title,
    authFormConfig.fieldPrototypes,
    authFormConfig.refPrototype);


authForm.onSubmit(function (formdata) {
    userService.login(formdata.login, formdata.password)
        .then(() => authForm.reset())
        .then(() => mainBlock.switch(authForm, mainMenu))
        .then(() => userService.getData())
        .catch((err) => alert(`Some error ${err.status}: ${err.responseText}`))
});

authForm.onRef(() => {
    mainBlock.switch(authForm, registrationForm);
});

const registrationForm = new Form(
    registrationFormConfig.title,
    registrationFormConfig.fieldPrototypes,
    registrationFormConfig.refPrototype
);

registrationForm.onSubmit(function (formdata) {
    userService.signup(formdata.email, formdata.login, formdata.password)
        .then(() => registrationForm.reset())
        .then(() => mainBlock.switch(registrationForm, mainMenu))
        .then(() => userService.getData())
        .catch((err) => alert(`Some error ${err.status}: ${err.responseText}`))
});

registrationForm.onRef(() => {
    mainBlock.switch(registrationForm, authForm);
});


mainMenu.onButtonClicked(MenuBlock.BUTTONS.PLAY, () => {
    if (userService.isLoggedIn()) {
        alert("Когда-нибудь тут будет игра");
        return
    }
    mainBlock.switch(mainMenu, authForm);
});

mainBlock.appendChildBlock(mainMenu);



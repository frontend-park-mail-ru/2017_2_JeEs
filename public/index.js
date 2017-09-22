import Block from "./blocks/block/block";
import SoundBlock from "./blocks/soundblock/soundblock";
import UserBlock from "./blocks/userblock/userblock";
import MenuBlock from "./blocks/mainmenu/mainmenu";
import Form from "./blocks/form/form";
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
const mainMenu = new MenuBlock();
const authForm = new Form(
    authFormConfig.title,
    authFormConfig.fieldPrototypes,
    authFormConfig.refPrototype);

const registrationForm = new Form(
    registrationFormConfig.title,
    registrationFormConfig.fieldPrototypes,
    registrationFormConfig.refPrototype
);

mainBlock.switch = (from, to) => {
    mainBlock.removeChildBlock(from);
    mainBlock.appendChildBlock(to);
};

mainMenu.onButtonClicked(0, () => {
    mainBlock.switch(mainMenu, authForm);
});

authForm.onRef(() => {
    mainBlock.switch(authForm, registrationForm);
});

registrationForm.onRef(() => {
    mainBlock.switch(registrationForm, authForm);
});

mainBlock.appendChildBlock(mainMenu);



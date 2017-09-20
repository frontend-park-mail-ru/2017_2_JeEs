import Block from "./blocks/block/block";
import SoundBlock from "./blocks/soundblock/soundblock";
import UserBlock from "./blocks/userblock/userblock";
import MenuBlock from "./blocks/mainmenu/mainmenu";
import Form from "./blocks/form/form";
import * as authFormConfig from "./configs/authformfields";
import * as registrationFormConfig from "./configs/registrationformfields";

const topBar = new Block(document.getElementsByClassName("top-bar")[0]);
topBar.appendChildBlock(new SoundBlock());
topBar.appendChildBlock(new UserBlock());

const gameNameBlock = new Block(document.getElementsByClassName("game-name-block")[0]);
gameNameBlock.appendChildBlock(Block.Create("h1", ["game-name-block__game-name"], {}).setText("Quoridor"));

const mainBlock = new Block(document.getElementsByClassName("main-block")[0]);
const mainMenu = new MenuBlock();
const authForm = new Form(authFormConfig.fieldPrototypes, authFormConfig.refPrototype);
const registrationForm = new Form(registrationFormConfig.fieldPrototypes, registrationFormConfig.refPrototype);

mainMenu.onButtonClicked(0, () => {
	mainBlock.removeChildBlock(mainMenu);
	mainBlock.appendChildBlock(authForm);
});

authForm.onRef(() => {
	mainBlock.removeChildBlock(authForm);
	mainBlock.appendChildBlock(registrationForm);
});

registrationForm.onRef(() => {
	mainBlock.removeChildBlock(registrationForm);
	mainBlock.appendChildBlock(authForm);
});

mainBlock.appendChildBlock(mainMenu);



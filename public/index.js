import Block from "./blocks/block/block";
import SoundBlock from "./blocks/soundblock/soundblock";
import UserBlock from "./blocks/userblock/userblock";
import MenuBlock from "./blocks/mainmenu/mainmenu";
import Form from "./blocks/form/form";
import * as AuthFormConfig from "./configs/authformfields"

const topBar = new Block(document.getElementsByClassName("top-bar")[0]);
topBar.appendChildBlock(new SoundBlock());
topBar.appendChildBlock(new UserBlock());

const gameNameBlock = new Block(document.getElementsByClassName("game-name-block")[0]);
gameNameBlock.appendChildBlock(Block.Create("h1", ["game-name-block__game-name"], {}).setText("Quoridor"));

const mainBlock = new Block(document.getElementsByClassName("main-block")[0]);
const mainMenu = new MenuBlock();
const authForm = new Form(AuthFormConfig.fieldPrototypes, AuthFormConfig.refPrototype);

mainMenu.onButtonClicked(0, () => {
	mainBlock.removeChildBlock(mainMenu);
	mainBlock.appendChildBlock(authForm);
});


mainBlock.appendChildBlock(mainMenu);



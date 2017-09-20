import Block from "./blocks/block/block";
import SoundBlock from "./blocks/soundblock/soundblock";
import UserBlock from "./blocks/userblock/userblock";
import MenuBlock from "./blocks/mainmenu/mainmenu";
import AuthForm from "./blocks/authform/authform";

const topBar = new Block(document.getElementsByClassName("top-bar")[0]);
topBar.appendChild(new SoundBlock());
topBar.appendChild(new UserBlock());

const gameNameBlock = new Block(document.getElementsByClassName("game-name-block")[0]);
gameNameBlock.appendChild(Block.Create("h1", ["game-name-block__game-name"], {}).setText("Quoridor"));

const mainBlock = new Block(document.getElementsByClassName("main-block")[0]);
const mainMenu = new MenuBlock();
const authForm = new AuthForm();

mainMenu.onButtonClicked(0, () => {
	mainBlock.removeChild(mainMenu);
	mainBlock.appendChild(authForm);
});


mainBlock.appendChild(mainMenu);



import Block from "./blocks/block/block";
import SoundBlock from "./blocks/soundblock/soundblock";
import UserBlock from "./blocks/userblock/userblock";
import MenuBlock from "./blocks/mainmenu/mainmenu"

const topBar = new Block(document.getElementsByClassName("top-bar")[0]);
topBar.append(new SoundBlock());
topBar.append(new UserBlock());

const gameNameBlock = new Block(document.getElementsByClassName("game-name-block")[0]);
gameNameBlock.append(Block.Create("h1", ["game-name-block__game-name"], {}).setText("Quoridor"));

const mainMenuBlock = new Block(document.getElementsByClassName("main-menu-block")[0]);
mainMenuBlock.append(new MenuBlock());

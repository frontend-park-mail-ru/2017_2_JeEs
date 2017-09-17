import Block from "./blocks/block/block";
import SoundBlock from "./blocks/soundblock/soundblock";
import UserBlock from "./blocks/userblock/userblock";

const topBar = new Block(document.getElementsByClassName("top-bar")[0]);
topBar.append(new SoundBlock());
topBar.append(new UserBlock());

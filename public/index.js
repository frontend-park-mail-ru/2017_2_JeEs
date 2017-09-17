import Block from "./blocks/block/block";
import SoundBlock from "./blocks/soundblock/soundblock";

const topBar = new Block(document.getElementsByClassName("top-bar")[0]);
topBar.append(new SoundBlock());

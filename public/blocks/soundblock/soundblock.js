import Block from "../block/block";
import Input from "../input/input";

class SoundBlock extends Block {
	constructor() {
		super(Block.Create("div", ["sound-block"], {})._element);

		this._createChildren();
		this._setEventsForThis();
		this._setEventsForMute();
		this._setEventsForSoundRange();
	}

	_createChildren() {
		this.mute = Block.Create(
			"img",
			["sound-block__mute"],
			{
				src: "static/images/soundon.png"
			});
		this.appendChildBlock(this.mute);

		this._previousSoundValue = 1;

		this.soundRange = Input.Create(
			"range",
			["sound-block__range"],
			{
				min: "0",
				max: "100",
				step: "1",
				value: "50"
			});
		this.soundRange.setHidden(true);
		this.appendChildBlock(this.soundRange);
	}

	_setEventsForThis() {
		this.on("mouseover", () => {
			this.soundRange.setHidden(false);
		});

		this.on("mouseout", () => {
			this.soundRange.setHidden(true);
		});
	}

	_setEventsForMute() {
		this.mute.click = () => {
			this.mute.setAttribute("muted", "");
			this.mute.setAttribute("src", "static/images/soundoff.png");
		};

		this.mute.unclick = () => {
			this.mute.removeAttribute("muted");
			this.mute.setAttribute("src", "static/images/soundon.png");
		};

		this.mute.on("click", () => {
			if (!this.mute.hasAttribute("muted")) {
				this._previousSoundValue = this.soundRange.getValue();
				this.soundRange.setValue(0);
				this.mute.click();
			} else {
				this.soundRange.setValue(this._previousSoundValue);
				this.mute.unclick();
			}
		});
	}

	_setEventsForSoundRange() {
		this.soundRange.on("change", () => {
			if (this.soundRange.getValue() === 0) {
				this._previousSoundValue = this.soundRange.getValue();
				this.mute.click();
			} else {
				if (this._previousSoundValue === 0) {
					this.mute.unclick();
				}
				this._previousSoundValue = this.soundRange.getValue();
			}
		});
	}
}

export default SoundBlock;

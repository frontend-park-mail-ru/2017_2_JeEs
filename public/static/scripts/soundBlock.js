'use strict';

const main = document.getElementById('main');

const mute = document.getElementById("mute");

const soundRange = document.getElementById("sound-range");

const soundBar = document.getElementById("sound-bar");

let soundValue = "0";

soundBar.addEventListener("mouseover", () => {
	soundRange.hidden = false
}, false);

soundBar.addEventListener("mouseout", () => {
	soundRange.hidden = true
}, false);

mute.addEventListener("click", () => {
	if (!mute.hasAttribute("clicked")) {
		soundValue = soundRange.value;
		soundRange.value = 0;
		mute.setAttribute("clicked", "");
		mute.setAttribute("src", "static/images/soundoff.png")
	}
	else {
		soundRange.value = soundValue;
		mute.removeAttribute("clicked");
		mute.setAttribute("src", "static/images/soundon.png")
	}
}, false);

soundRange.addEventListener("change", () => {
	if (+soundRange.value === 0) {
		soundValue = soundRange.value;
		mute.setAttribute("clicked", "");
		mute.setAttribute("src", "static/images/soundoff.png")
	} else {
		if (mute.hasAttribute("clicked")) {
			mute.removeAttribute("clicked");
			mute.setAttribute("src", "static/images/soundon.png")
		}
	}
});

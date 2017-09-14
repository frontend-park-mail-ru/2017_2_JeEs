'use strict';

const main = document.getElementById('main');

const usernameDiv = document.getElementById('username-div');

const authorizedBlock = document.getElementById('authorized');

const unauthorizedBlock = document.getElementById('unauthorized');

const authForm = document.getElementById('auth-form');

const liveSectionsCollection = application.getElementsByTagName('section');

const loginBlock = document.getElementById('loginBlock');

const logoutButton = document.getElementById('logout-button');

const mute = document.getElementById("mute");

const soundRange = document.getElementById("sound-range");

const soundBar = document.getElementById("sound-bar");

const onMainButtons = document.getElementsByClassName("onMain");

const loginForm = document.getElementById('login-form');

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

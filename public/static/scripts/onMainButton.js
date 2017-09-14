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


Array.from(onMainButtons).forEach(onMainButton => {
	onMainButton.addEventListener("click", () => {
		Array.from(liveSectionsCollection).forEach(sectionElement => {
			sectionElement.hidden = true;
		});
		main.hidden = false;
	});
});

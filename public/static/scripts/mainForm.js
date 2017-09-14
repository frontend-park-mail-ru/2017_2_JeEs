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

main.addEventListener('click', event => {
	const sectionId = event.target.getAttribute('data-section');
	if (sectionId === null) return;

	const liveSectionsArray = Array.from(liveSectionsCollection);

	if (sectionId === 'game') {
		whoami((err, resp) => {
			if (err) {
				return alert(`AUTH Error: ${err.status}`);
			}
			liveSectionsArray.forEach(section => {
				section.hidden = section.id !== 'game';
			});
		});
		return;
	}

	liveSectionsArray.forEach(sectionElement => {
		sectionElement.hidden = sectionElement.id !== sectionId;
	});
});

function whoami(callback) {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', '/me', true);
	xhr.withCredentials = true;

	xhr.onreadystatechange = function () {
		if (xhr.readyState !== 4) return;
		if (+xhr.status !== 200) {
			return callback(xhr, null);
		}

		const response = JSON.parse(xhr.responseText);
		callback(null, response);
	};

	xhr.send();
}

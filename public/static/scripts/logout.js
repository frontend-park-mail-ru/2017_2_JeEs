'use strict';

const main = document.getElementById('main');

const usernameDiv = document.getElementById('username-div');

const authorizedBlock = document.getElementById('authorized');

const unauthorizedBlock = document.getElementById('unauthorized');

const logoutButton = document.getElementById('logout-button');

logoutButton.addEventListener('click', () => {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', '/logout', true);
	xhr.withCredentials = true;

	xhr.onreadystatechange = function () {
		if (xhr.readyState !== 4) return;
		if (+xhr.status !== 200) {
			return callback(xhr, null);
		}

		usernameDiv.textContent = "";
		authorizedBlock.hidden = true;
		unauthorizedBlock.hidden = false;
	};

	xhr.send();

});

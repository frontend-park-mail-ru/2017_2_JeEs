'use strict';

const main = document.getElementById('main');

const usernameDiv = document.getElementById('username-div');

const authorizedBlock = document.getElementById('authorized');

const unauthorizedBlock = document.getElementById('unauthorized');

const loginForm = document.getElementById('login-form');


loginForm.addEventListener('submit', event => {
	event.preventDefault();
	console.log(loginForm.elements);
	const email = loginForm.elements['email'].value;
	const username = loginForm.elements['username'].value;

	login(username, email, (err, resp) => {
		if (err) {
			return alert(`AUTH Error: ${err.status}`);
		}
		usernameDiv.textContent = username;
		authorizedBlock.hidden = false;
		unauthorizedBlock.hidden = true;
		loginForm.reset();
		loginForm.parentElement.parentElement.hidden = true;
		main.hidden = false;
	});
});


function login(username, email, callback) {
	const xhr = new XMLHttpRequest();
	xhr.open('POST', '/login', true);
	xhr.withCredentials = true;

	const user = {username, email};
	const body = JSON.stringify(user);

	xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8');

	xhr.onreadystatechange = function () {
		if (xhr.readyState !== 4) return;
		if (+xhr.status !== 200) {
			return callback(xhr, null);
		}

		const response = JSON.parse(xhr.responseText);
		callback(null, response);
	};

	xhr.send(body);
}

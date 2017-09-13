'use strict';

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

'use strict';

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

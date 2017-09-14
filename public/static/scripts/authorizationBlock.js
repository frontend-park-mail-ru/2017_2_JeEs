'use strict';

const main = document.getElementById('main');

const liveSectionsCollection = application.getElementsByTagName('section');

const loginBlock = document.getElementById('loginBlock');


loginBlock.addEventListener('click', event => {
	const sectionId = event.target.getAttribute('data-section');
	if (sectionId === null) return;


	const liveSectionsArray = Array.from(liveSectionsCollection);

	liveSectionsArray.forEach(sectionElement => {
		sectionElement.hidden = sectionElement.id !== sectionId;
	});
});

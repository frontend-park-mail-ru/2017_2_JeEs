'use strict';

loginBlock.addEventListener('click', event => {
	const sectionId = event.target.getAttribute('data-section');
	if (sectionId === null) return;


	const liveSectionsArray = Array.from(liveSectionsCollection);

	liveSectionsArray.forEach(sectionElement => {
		sectionElement.hidden = sectionElement.id !== sectionId;
	});
});

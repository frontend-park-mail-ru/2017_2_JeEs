'use strict';

const main = document.getElementById('main');

const liveSectionsCollection = application.getElementsByTagName('section');

const onMainButtons = document.getElementsByClassName("onMain");


Array.from(onMainButtons).forEach(onMainButton => {
	onMainButton.addEventListener("click", () => {
		Array.from(liveSectionsCollection).forEach(sectionElement => {
			sectionElement.hidden = true;
		});
		main.hidden = false;
	});
});

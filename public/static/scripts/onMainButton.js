'use strict';

Array.from(onMainButtons).forEach(onMainButton => {
	onMainButton.addEventListener("click", () => {
		Array.from(liveSectionsCollection).forEach(sectionElement => {
			sectionElement.hidden = true;
		});
		main.hidden = false;
	});
});

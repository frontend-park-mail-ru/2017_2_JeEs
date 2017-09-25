/**
 * Модуль, реализующий общее поведение для каждого блока
 * @module Block */

class Block {
	constructor(element) {
		this._element = element;
	}

	static Create(tagName = 'div', classes = [], attrs = {}) {
		const element = document.createElement(tagName);
		classes.forEach((className) => {
			element.classList.add(className);
		});
		for (let name in attrs) {
			element.setAttribute(name, attrs[name]);
		}
		return new Block(element);
	}

	setText(text) {
		this._element.textContent = text;
		return this;
	}

	setHidden(isHidden) {
		this._element.style.display = (isHidden) ? "none" : "flex";
	}


	appendChildBlock(block) {
		this._element.appendChild(block._element);
		return this;
	}

	removeChildBlock(block) {
		this._element.removeChild(block._element);
		return this;
	}

	removeAllChild() {
        while (this._element.firstChild) {
            this._element.removeChild(this._element.firstChild);
        }
	}

	on(event, callback) {
		this._element.addEventListener(event, callback);
	}

	hasAttribute(attribute) {
		return this._element.hasAttribute(attribute);
	}

	setAttribute(attribute, value) {
		this._element.setAttribute(attribute, value);
	}

	getAttribute(attribute) {
		return +this._element.getAttribute(attribute);
	}

	removeAttribute(attribute) {
		this._element.removeAttribute(attribute);
	}
}

export default Block;

/**
 * Модуль, реализующий общее поведение для каждого блока
 * @module Block */

class Block {
	constructor(...args) {
		this._eventsListening = [];

		if (typeof(args[0]) === "string") {
			let tagName = args[0];
			let classes = args[1] || [];
			let attrs = args[2] || {};

            this._element = document.createElement(tagName);
			classes.forEach((className) => {
                this._element.classList.add(className);
            });
            for (let name in attrs) {
                this._element.setAttribute(name, attrs[name]);
            }
		} else if (args[0] instanceof Node) {
			this._element = args[0];
		}
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

	removeAllChildren() {
        while (this._element.firstChild) {
            this._element.removeChild(this._element.firstChild);
        }
	}

	on(event, callback) {
		if (this._eventsListening.indexOf(event) === -1) {
            this._element.addEventListener(event, callback);
            this._eventsListening.push(event);
        }
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

	removeListener(event, callback) {
		let index = this._eventsListening.indexOf(event);
        if (index > -1) {
            this._element.removeEventListener(event, callback);
            this._eventsListening.splice(index, 1);
        }
	}
}

export default Block;

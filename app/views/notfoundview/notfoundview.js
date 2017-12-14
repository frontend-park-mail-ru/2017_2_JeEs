import BaseView from '../baseview';

const imageStyle = {
    selector: '.cry-image',
    styles: {
        'background-image': 'url(\'./images/cat.png\')',
        'filter': 'blur(5px)'
    }
};

const createStylesheet = (styles) => {
    return styles.reduce((stylesheet, current) => {

        const properties = Object.entries(current.styles)
            .map(prop => prop[0] + ':' + prop[1] + ';');


        stylesheet += `${current.selector}{${properties.join('')}}\n`;

        return stylesheet;

    }, '');
};

const appendStylesheet = (stylesheet) => {
    styleElement = document.querySelector('.theme-styles');
    if (!styleElement) {
        var styleElement = document.createElement('style');
        styleElement.classList.add('theme-styles');
        document.head.appendChild(styleElement);
    }
    styleElement.innerHTML = stylesheet;
};

let style = createStylesheet([imageStyle]);

export default class NotFoundView extends BaseView {
    constructor(parent) {
        super(parent);

        this.template = require('./notfound.pug');
    }

    create() {
        this.element.innerHTML = this.template({});

        document
            .querySelector('.image-switch')
            .addEventListener('click', function (evt) {
                appendStylesheet(style);
            });
    }

}
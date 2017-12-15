const createStylesheet = (styles) => {
    return styles.reduce((stylesheet, current) => {

        const properties = Object.entries(current.styles)
            .map(([key, value]) => `${key}:${value};`);


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



const wallStyle = {
    selector: 'html',
    styles: {
        'background-image': 'url(\'/images/wall3.jpg\')',
    }
};

const gamenameStyle = {
    selector: '.game-name-block__game-name',
    styles: {
        'color': '#412234'
    }
};

const gamenameStyleHover = {
    selector: '.game-name-block__game-name:hover',
    styles: {
        'color': '#402641'
    }
};

const mainButtonsStyle = {
    selector: '.main-menu__menu-button',
    styles: {
        'color': '#412234',
        'background-color': '#BDD9BF'
    }
};

const mainButtonHover = {
    selector: '.main-menu__menu-button:hover',
    styles: {
        'background-color': '#9fd9a8'
    }
};

const userButtonsStyle = {
    selector: '.user-block__button',
    styles: {
        'color': '#BDD9BF',
        'background-color': '#412234'
    }
};

const userButtonHover = {
    selector: '.user-block__button:hover',
    styles: {
        'background-color': '#402641',
        'border-color': '#BDD9BF'
    }
};

const changeButtonsStyle = {
    selector: '.change-theme',
    styles: {
        'color': '#BDD9BF',
        'background-color': '#412234',
    }
};

const changeButtonHover = {
    selector: '.change-theme:hover',
    styles: {
        'background-color': '#402641',
        'border-color': '#BDD9BF'
    }
};

const formFieldStyle = {
    selector: '.form__field',
    styles: {
        'color': '#412234',
    }
};

const formFieldHover = {
    selector: '.form__field:hover',
    styles: {
        'border-color': '#412234',
    }
};

const formTitle = {
    selector: '.form__title',
    styles: {
        'color': '#412234',
    }
};

const formButtonStyle = {
    selector: '.form__button',
    styles: {
        'color': '#BDD9BF',
        'background-color': '#412234',
    }
};

const formButtonHover = {
    selector: '.form__button:hover',
    styles: {
        'background-color': '#402641',
        'border-color': '#BDD9BF'
    }
};

const authorsStyle = {
    selector: '.authors__author',
    styles: {
        'color': '#402641',
    }
};

const authorsHover = {
    selector: '.authors__author:hover',
    styles: {
        'color': '#BDD9BF',
    }
};

const mainAuthorsStyle = {
    selector: '.main-block__authors',
    styles: {
        'color': '#402641',
    }
};

const mainRatingStyle = {
    selector: '.main-block__rating',
    styles: {
        'color': '#402641',
    }
};

const mainRulesStyle = {
    selector: '.main-block__rules',
    styles: {
        'color': '#402641',
        'text-shadow': '-1px 0 #BDD9BF, 0 1px #BDD9BF, 1px 0 #BDD9BF, 0 -1px #BDD9BF'
    }
};

let hasTheme = false;
let styles = createStylesheet([wallStyle, mainButtonsStyle, gamenameStyle, gamenameStyleHover,
    mainButtonHover, userButtonsStyle, userButtonHover, changeButtonsStyle,
    changeButtonHover, formFieldStyle, formFieldHover, formTitle, formButtonStyle,
    formButtonHover, authorsStyle, authorsHover, mainAuthorsStyle, mainRatingStyle,
    mainRulesStyle]);

export default function ChangeTheme() {
    let stylesheet = hasTheme ? '' : styles;

    appendStylesheet(stylesheet);
    hasTheme = !hasTheme;
}
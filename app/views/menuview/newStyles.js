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

// const gamenameStyleHover = {
//     selector: '.game-name-block__game-name:hover',
//     styles: {
//         'color': '#402641'
//     }
// };

const mainButtonsStyle = {
    selector: '.main-menu__menu-button',
    styles: {
        'color': '#412234',
        'background-image': 'url(\'/images/mramor3.jpg\')'
    }
};

const mainButtonHover = {
    selector: '.main-menu__menu-button:hover',
    styles: {
        'border-radius': '20px',
        'border-color': '#BDD9BF'
    }
};

const userButtonsStyle = {
    selector: '.user-block__button',
    styles: {
        'color': '#412234',
        'background-image': 'url(\'/images/mramor3.jpg\')'
    }
};

const userButtonHover = {
    selector: '.user-block__button:hover',
    styles: {
        'border-radius': '20px',
        'border-color': '#412234',
    }
};

const changeButtonsStyle = {
    selector: '.change-theme',
    styles: {
        'color': '#412234',
        'background-image': 'url(\'/images/mramor3.jpg\')'
    }
};

const changeButtonHover = {
    selector: '.change-theme:hover',
    styles: {
        'border-radius': '20px',
        'border-color': '#412234',
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
        'color': '#BDD9BF'
    }
};

const formButtonStyle = {
    selector: '.form__button',
    styles: {
        'color': '#412234',
        'background-image': 'url(\'/images/mramor3.jpg\')'
    }
};

const formButtonHover = {
    selector: '.form__button:hover',
    styles: {
        'border-radius': '20px',
        'border-color': '#412234',
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
    }
};

const gameMode = {
    selector: '.main-block__gamemode-button',
    styles: {
        'color': '#412234',
        'background-image': 'url(\'/images/mramor3.jpg\')'
    }
};

const authorsNames = {
    selector: '.main-block__names',
    styles: {
        'border-color': '#412234',
    }
};

const rulesBlock = {
    selector: '.main-block__rules\n',
    styles: {
        'border-color': '#412234',
    }
};


let hasTheme = false;
let styles = createStylesheet([wallStyle, mainButtonsStyle, gamenameStyle,
    mainButtonHover, userButtonsStyle, userButtonHover, changeButtonsStyle,
    changeButtonHover, formFieldStyle, formFieldHover, formTitle, formButtonStyle,
    formButtonHover, authorsStyle, authorsHover, mainAuthorsStyle, mainRatingStyle,
    mainRulesStyle, gameMode, authorsNames, rulesBlock]);

export default function ChangeTheme() {
    let stylesheet = hasTheme ? '' : styles;

    appendStylesheet(stylesheet);
    hasTheme = !hasTheme;
}
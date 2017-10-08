import Block from './blocks/block/block';
import MenuView from './views/menuview/menuview';
import RatingView from './views/ratingview/ratingview';

import AuthView from './views/formsview/authview';
import RegistrationView from './views/formsview/registrationview';
import SoundView from './views/soundblockview/soundblockview';

import AuthUserView from './views/userblockview/authUserView';
import UnauthUserView from './views/userblockview/unauthUserView';


import UserService from './services/user-service';


const userService = new UserService();

const root = new Block(document.getElementById('root'));

const topBar = new Block('div', ['top-bar']);

root.appendChildBlock('topbar', topBar);


const gameNameBlock = new Block('div', ['game-name-block']);
root.appendChildBlock('game-name-block', gameNameBlock);
gameNameBlock.appendChildBlock('game-name', new Block('h1', ['game-name-block__game-name']).setText('Querydor'));

const mainBlock = new Block('div', ['main-block']);
root.appendChildBlock('main-block', mainBlock);


const soundView = new SoundView(topBar);
soundView.create();

const menuView = new MenuView(mainBlock);
const ratingView = new RatingView(mainBlock);
const authView = new AuthView(mainBlock);
const registrationView = new RegistrationView(mainBlock);

const authUserView = new AuthUserView(topBar);
const unauthUserView = new UnauthUserView(topBar);

//наверное хорошо бы не трогать userService в index.js, но пока так
userService.getData()
    .then(() => authUserView.create())
    .catch(() => unauthUserView.create());

menuView.create();

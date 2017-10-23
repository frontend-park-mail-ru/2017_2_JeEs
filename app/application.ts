'use strict';

import ApplicationView from './views/applicationview/applicationview';
import AuthUserView from './views/userblockview/auth/authview';
import UnauthUserView from './views/userblockview/unauth/unauthview';
import MenuView from './views/menuview/menuview';
import RatingView from './views/ratingview/ratingview';
import AuthView from './views/formsview/authview/authview';
import RegistrationView from './views/formsview/registrationview/registrationview';
import NotFoundView from  './views/notfoundview/notfoundview';
import CreatorsView from './views/authorsview/authorsview';
import GameView from  './views/gameview/gameview';
import RulesView from  './views/rulesview/rulesview';



import Router from './modules/router';

import UserService from './services/user-service';

const userService = new UserService();

const root = new ApplicationView(document.body);
root.create();

const mainBlock = root.getMainBlock();
const topBar = root.getTopBar();


// const soundView = new SoundView(topBar);
// soundView.create();


const authUserView = new AuthUserView(topBar);
const unauthUserView = new UnauthUserView(topBar);

const notFoundView = new NotFoundView(mainBlock);
const creatorsView = new CreatorsView(mainBlock);
const gameView = new GameView(mainBlock);
const rulesView = new RulesView(mainBlock);
const menuView = new MenuView(mainBlock);
const ratingView = new RatingView(mainBlock);
const authView = new AuthView(mainBlock);
const registrationView = new RegistrationView(mainBlock);

const router = new Router();

router.setNotFoundPage(notFoundView);

router.register('/', menuView)
    .register('/game', gameView)
    .register('/rating', ratingView)
    .register('/signin', authView)
    .register('/signup', registrationView)
    .register('/authors', creatorsView)
    .register('/rules', rulesView)
    .start();

userService.getData()
    .then(() => authUserView.create())
    .catch(() => unauthUserView.create());

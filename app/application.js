'use strict';

function requireAll(r) { r.keys().forEach(r); }

requireAll(require.context('../public/static/fonts/', true, /\.(ttf)$/));
requireAll(require.context('../public/static/images/', true, /\.(png|jpg)$/));
requireAll(require.context('../public/', true, /\.(babylon)$/));

requireAll(require.context('./views/', true, /\.(scss)$/));
requireAll(require.context('./views/', true, /\.(pug|jade)$/));
requireAll(require.context('./game/', true, /\.(ts)$/));

import ApplicationView from './views/applicationview/applicationview';
import AuthUserView from './views/userblockview/auth/authview';
import UnauthUserView from './views/userblockview/unauth/unauthview';
import MenuView from './views/menuview/menuview';
import RatingView from './views/scoreboardview/scoreboardview';
import AuthView from './views/formsview/authview/authview';
import RegistrationView from './views/formsview/registrationview/registrationview';
import NotFoundView from './views/notfoundview/notfoundview';
import CreatorsView from './views/authorsview/authorsview';
import GameView from './views/gameview/gameview';
import RulesView from './views/rulesview/rulesview';
import GameModeView from './views/gamemodeview/gamemodeview';



import Router from './modules/router';

import UserService from './services/user-service';
import LoadingView from "./views/loadingview/loading";

const userService = new UserService();

const root = new ApplicationView(document.body);
root.create();

const mainBlock = root.getMainBlock();
const topBar = root.getTopBar();

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
const gameModeView = new GameModeView(mainBlock);

const loadingView = new LoadingView(mainBlock);


const router = new Router();

router.setNotFoundPage(notFoundView);

router.register('/', menuView)
    .register('/game', gameView)
    .register('/gamemode', gameModeView)
    .register('/rating', ratingView)
    .register('/signin', authView)
    .register('/signup', registrationView)
    .register('/authors', creatorsView)
    .register('/rules', rulesView)
    .register('/loading', loadingView)
    .start();

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js', { scope: '/' })
        .then((registration) => {
            console.log('ServiceWorker registration', registration);
        })
        .catch((error) => {
            throw new Error(`ServiceWorker error: ${error}`);
        });
}

userService.getData()
    .then(() => authUserView.create())
    .catch(() => unauthUserView.create());


import ApplicationView from './views/applicationview/applicationview';

import AuthUserView from './views/userblockview/auth/authview';
import UnauthUserView from './views/userblockview/unauth/unauthview';
import MenuView from './views/menuview/menuview';
import RatingView from './views/ratingview/ratingview';
import AuthView from './views/authview/authview';
import RegistrationView from './views/registrationview/registrationview';

import Router from './modules/router'

import UserService from './services/user-service';

const userService = new UserService();

const root = new ApplicationView(document.body);
root.create();

const mainBlock = root.getMainBlock();
const topBar = root.getTopBar();


// const soundView = new SoundView(topBar);
// soundView.create();

const menuView = new MenuView(mainBlock);
const ratingView = new RatingView(mainBlock);
const authView = new AuthView(mainBlock);
const registrationView = new RegistrationView(mainBlock);
const authUserView = new AuthUserView(topBar);
const unauthUserView = new UnauthUserView(topBar);

const router = new Router(mainBlock);

router.setNotFoundPage();

router.register('/', menuView)
    .register('/rating', ratingView)
    .register('/signin', authView)
    .register('/signup', registrationView)
    .start();

userService.getData()
    .then(() => authUserView.create())
    .catch(() => unauthUserView.create());



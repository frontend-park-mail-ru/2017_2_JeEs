export default class FullScreenLogic {
    private _fullScreen: boolean = false;

    private _element;

    constructor(element) {
        this._element = element;

        document.addEventListener("keypress", this._fullScreenLogic);
    }

    private _launchIntoFullscreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }

    private _exitFullScreen(element) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }

    public destroy() {
        document.removeEventListener("keypress", this._fullScreenLogic);
        this._element = null;
    }

    private _fullScreenLogic = event => {
        if (event.code === 'KeyF') {
            if (this._fullScreen) {
                this._exitFullScreen(this._element);
                this._fullScreen = false;
            } else {
                this._launchIntoFullscreen(this._element);
                this._fullScreen = true;
            }
        }
    }
}
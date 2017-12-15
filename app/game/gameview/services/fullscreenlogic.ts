export default class FullScreenLogic {
    private static _fullScreen: boolean = false;

    static addFullScreen(element) {
        document.onkeypress = event => {
            if (event.code === 'KeyF') {
                if (this._fullScreen) {
                    FullScreenLogic._exitFullScreen(element);
                    this._fullScreen = false;
                } else {
                    FullScreenLogic._launchIntoFullscreen(element);
                    this._fullScreen = true;                    
                }
            }
        };
    }

    static _launchIntoFullscreen(element) {
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

    static _exitFullScreen(element) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}
export default class FullScreenLogic {
    static addFullScreen(element) {
        document.onkeypress = event => {
            debugger;
            if (event.code === "KeyF") {
                if (!document.fullScreen) {
                    FullScreenLogic._launchIntoFullscreen(element);
                    // element.requestPointerLock();
                } else {
                    FullScreenLogic._exitFullScreen();
                }
            }
        }
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

    static _exitFullScreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}
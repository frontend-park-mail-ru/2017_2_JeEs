import BaseView from '../baseview';

export default class ScoreboardView extends BaseView {
    constructor(parent) {
        super(parent);

        this.lowerOffset = 0;
        this.upperOffset = 0;
        this.chunkSize = 15;
        this.limit = 20;
        this.loadingInProcess = false;

        this.template = require('./scoreboard.pug');
    }

    create() {
        this.userService.getScoreboard(this.lowerOffset, this.chunkSize)
            .then((scoreboardArray) => {
                this.element.innerHTML = this.template({dataList: scoreboardArray});
                this.lowerOffset += this.chunkSize;

                let loadingBlocks = [...document.querySelectorAll('.loading-block')];
                loadingBlocks.forEach((loadingBlock) => {
                    loadingBlock.setVisible = (visible) => {
                        loadingBlock.style.display = (visible) ? 'flex' : 'none';
                    };
                });
                let [upperLoadingBlock, lowerLoadingBlock] = loadingBlocks;
                this.upperLoadingBlock = upperLoadingBlock;
                this.lowerLoadingBlock = lowerLoadingBlock;

                this.scoreboard = document.querySelector('.scoreboard');
                this.scoreboard.insertAfter = (function(elementToInsert, topElement) {
                    this.insertBefore(elementToInsert, topElement.nextSibling);
                }).bind(this.scoreboard);
                this.scoreboard.addEventListener('scroll', this.onScroll.bind(this));
            });
    }

    onScroll() {
        if ((this.scoreboard.scrollTop === 0) && (this.upperOffset !== 0)) {
            this.upperLoadingBlock.setVisible(true);
            (async () => {
                this.loadingInProcess = true;
                return await this.userService.getScoreboard(this.upperOffset - this.chunkSize, this.chunkSize);
            })().then((scoreboardArray) => {
                if (this.scoreboard.children.length - 2 >= this.limit) {
                    this.popRows(this.chunkSize, "back");
                }
                this.pushRows(scoreboardArray, "front");
                this.loadingInProcess = false;
                this.upperLoadingBlock.setVisible(false);
                this.scoreboard.scrollTo(0, 31 * 15);
            });
        }
        if ((this.scoreboard.scrollHeight - this.scoreboard.scrollTop === this.scoreboard.clientHeight) && !this.loadingInProcess) {
            (async () => {
                this.loadingInProcess = true;
                return await this.userService.getScoreboard(this.lowerOffset, this.chunkSize);
            })().then((scoreboardArray) => {
                if (this.scoreboard.children.length - 2 >= this.limit) {
                    this.popRows(this.chunkSize, "front");
                }
                this.pushRows(scoreboardArray, "back");
                this.loadingInProcess = false;
            });
        }
    }

    pushRows(scoreboardArray, where) {
        if (where === "back") {
            scoreboardArray.forEach((scoreboardRow) => {
                let newRow = document.createElement('li');
                newRow.innerHTML = `<span class="userName">${scoreboardRow.userName}</span><span class="score">${scoreboardRow.score}</span>`;
                this.scoreboard.insertBefore(newRow, this.lowerLoadingBlock);
            });
            this.lowerOffset += scoreboardArray.length;
        } else if (where === "front") {
            scoreboardArray.reverse().forEach((scoreboardRow) => {
                let newRow = document.createElement('li');
                newRow.innerHTML = `<span class="userName">${scoreboardRow.userName}</span><span class="score">${scoreboardRow.score}</span>`;
                this.scoreboard.insertAfter(newRow, this.upperLoadingBlock);
            });
            this.upperOffset -= scoreboardArray.length;
        }
    }

    popRows(nRows, where) {
        this.scoreboard.querySelectorAll("scoreboard__row");

        if (where === "back") {
            let length = this.scoreboard.children.length;
            for(let i = 0; i < nRows; ++i) {
                this.scoreboard.removeChild(this.scoreboard.lastChild.previousSibling);
            }          
            this.lowerOffset -= nRows;
        } else if (where === "front") {
            for(let i = 0; i < nRows; ++i) {
                this.scoreboard.removeChild(this.scoreboard.children[1]);
            }
            this.upperOffset += nRows;
        }
    }
}
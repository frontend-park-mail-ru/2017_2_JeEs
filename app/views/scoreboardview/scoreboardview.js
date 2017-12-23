import BaseView from '../baseview';
import Router from '../../modules/router';

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
                this.scoreboard.addEventListener('scroll', this.onScroll.bind(this));
            });


            this.backButton = this.element.querySelector('.main-block__back-in-rating');
        
            this.backButton.addEventListener('click', (event) => {
                event.preventDefault();
                (new Router()).back();
            });
    
    }

    onScroll() {
        if ((this.scoreboard.scrollTop === 0) && (this.upperOffset !== 0)) {
            this.upperLoadingBlock.setVisible(true);
        }
        if ((this.scoreboard.scrollHeight - this.scoreboard.scrollTop === this.scoreboard.clientHeight) && !this.loadingInProcess) {
            (async () => {
                this.loadingInProcess = true;
                return await this.userService.getScoreboard(this.lowerOffset, this.chunkSize);
            })().then((scoreboardArray) => {
                this.insertRows(scoreboardArray);
                this.lowerOffset += this.chunkSize;
                this.loadingInProcess = false;
            })
        }
    }

    insertRows(scoreboardArray) {
        scoreboardArray.forEach((scoreboardRow) => {
            let newRow = document.createElement('li');
            newRow.innerHTML = `<span class="userName">${scoreboardRow.userName}</span><span class="score">${scoreboardRow.score}</span>`;
            this.scoreboard.insertBefore(newRow, this.lowerLoadingBlock);
        });
    }
}
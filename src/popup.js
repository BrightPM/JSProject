'use strict';

export default class PopUp {
    constructor() {
        this.gameScore = document.querySelector('.game__score');
        this.popUp = document.querySelector('.replayPop-up');
        this.popUpMessage = document.querySelector('.pop-up__message');
        this.popUpBtn = document.querySelector('.replayBtn');
        this.popUpBtn.addEventListener('click', () => {
            this.onClick && this.onClick();
            this.hide();
            this.initScore();
        });
    }

    setClickListner(onClick) {
        this.onClick = onClick;
    }

    showwithText(text) {
        this.popUpMessage.innerText = text;
        this.popUp.classList.remove('replayPop-up--hide');
    }

    hide() {
        this.popUp.classList.add('replayPop-up--hide');
    }

    initScore() {
        this.gameScore.innerHTML = 10;
    }
}
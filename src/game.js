import {Field, ItemType} from './field.js';
import * as sound from './sound.js';

export const Reason = Object.freeze({
win: 'win',
lose: 'lose',
cancel: 'cancel',
});

// Builder Pattern
export class GameBuilder {
    gameDuration(duration) {
        this.game__Duration = duration;
        return this;
    }

    carrotcount(num) {
        this.carrot__count = num;
        return this;
    }

    bugCount(num) {
        this.bug__Count = num;
        return this;
    }

    build() {
        return new Game(
            this.game__Duration,
            this.carrot__count,
            this.bug__Count
        );
    }
}

class Game {
    constructor(gameDuration, carrotCount, bugCount) {
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        
        this.gameTimer = document.querySelector('.game__timer');
        this.gameBtn = document.querySelector('.game__button');
        this.gameScore = document.querySelector('.game__score');
        this.gameBtn.addEventListener('click', ()=>{
            if (this.started){
                this.stop(Reason.cancel);
            } else {
                this.start();
            }
        });
        
        this.gameField = new Field(carrotCount, bugCount);
        this.gameField.setClickListener(this.onItemClick);

        this.started = false;
        this.score = 10;
        this.timer = undefined;
    }

    setGameStopListener(onGameStop) {
        this.onGameStop = onGameStop;
    }

    start() {
        this.started = true;
        this.initGame();
        this.ShowStopBtn();
        this.showTimerAndScore();
        this.startGameTimer();
        sound.playBackground();
    }
    
    stop(reason) {
        this.started = false;
        this.stopGameTimer();
        this.hideGameButton();
        this.started = false;
        sound.stopBackground();
        this.onGameStop && this.onGameStop(reason);
    }

    onItemClick = item => {
        if(!this.started){
            return;
        }
        if(item === ItemType.carrot){
            this.score++;
            this.updateScoreBoard();
            if(this.score === this.carrotCount) {
                this.stop(Reason.win);
            }
        } else if(item === ItemType.bug){
            this.stop(Reason.lose);
            }
    };
    
    initGame(){
        this.score = 0;
        this.gameScore.innerText = this.carrotCount;
        this.gameField.init();
    }
    
    updateScoreBoard() {
        this.gameScore.innerText = this.carrotCount - this.score;
    }
    
    ShowStopBtn() {
        const icon = this.gameBtn.querySelector('.fas');
        icon.classList.add('fa-stop');
        icon.classList.remove('fa-play');
        this.gameBtn.style.visibility = 'visible';
    }
    
    showTimerAndScore() {
        this.gameScore.style.visibility = 'visible';
        this.gameTimer.style.visibility = 'visible';
    }

    startGameTimer() {
        let remainingTimeSec = this.gameDuration;
        this.updateTimerText(remainingTimeSec);
        this.timer = setInterval(()=> {
            if(remainingTimeSec <= 0) {
                clearInterval(this.timer);
                this.stop(this.carrotCount === this.score ? Reason.win : Reason.lose);
                return;
            }
            this.updateTimerText(--remainingTimeSec);
        }, 1000);
    }
    
    updateTimerText(time) {
        const minutes = Math.floor(time/60);
        const seconds = time % 60;
        this.gameTimer.innerText = `${minutes}:${seconds}`;
    }
    
    stopGameTimer() {
        clearInterval(this.timer);
    }
    
    hideGameButton() {
        this.gameBtn.style.visibility = 'hidden';
    }
}


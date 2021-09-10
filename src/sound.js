const carrotSound = new Audio('./sound/carrot_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');


export function playCarrot() {
    playSound(carrotSound);
}

export function playBug() {
    playSound(bugSound);
}
export function playAlert() {
    playSound(alertSound);
}
export function playWin() {
    winSound.playbackRate = 1.5;
    playSound(winSound);
}
export function playBackground() {
    bgSound.playbackRate= 1.5;
    playSound(bgSound);
}
export function stopBackground() {
    stopSound(bgSound);
}

function playSound(sound){
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound){
    sound.pause();
}
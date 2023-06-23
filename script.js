window.alert(" Use 'a' and 'd' to move Player1 !⚠⚠⚠\n Use 'leftArrow' and 'rightArrow' to move Player2");
// ------------------------------------ BALL-----------------------------------
var ball = document.getElementById('ball');
var ballRotation = 0;
setInterval(function () {
    ball.style.transform = 'rotate(' + ballRotation + 'deg)';
    ballRotation += 9;
    ballRotation %= 360;
}, 5)
var pauseSound = new Audio("pause.mp3");
var startSound = new Audio("start.mp3");
var bounceSound = new Audio("bounce.mp3");
var victorySound = new Audio("victory.mp3");
var errorSound = new Audio("error.mp3");
resetBallPos();
var gamePaused = true;
var intervalID;
var player1 = document.getElementById('player1');
var player2 = document.getElementById('player2');
var player1Score = document.getElementById('player1-score');
var player2Score = document.getElementById('player2-score');
var smallPlayButton = document.getElementById('played');
var pauseButton = document.getElementById('pause');
var pl1Score = 0;
var pl2Score = 0;

var playMenu = document.getElementById('play-menu');
var timeOutIntervalId;
var restartButton = document.getElementById('restart');
var playButton = document.getElementById('start-button');
var playerInput1 = document.getElementById('player1-input');
var playerInput2 = document.getElementById('player2-input');
var playMenuElements = document.querySelectorAll('#play-menu div');
let gameResult = document.getElementById('game-result');

var playAgain = document.getElementById('play-again');
var winner = document.getElementById('winner-player-name');
var scoreDisplay = document.getElementById('score-display');

//**********Maintain High Score*************
if (localStorage.getItem('highestScore') != null) {
    scoreDisplay.innerHTML = "Highest Score: " + localStorage.getItem('highestScore') + " by " + localStorage.getItem('highestScorer');
}
//Show winner Card*******************
var greenHeight = gameResult.style.height;
var greenWidth = gameResult.style.width;
var blueWidth = playMenu.style.width;
var blueHeight = playMenu.style.height;
function showWinnerCard() {
    gameResult.style.visibility = 'visible';
    gameResult.style.height = greenHeight;
    gameResult.style.width = greenWidth;
    playAgain.style.visibility = 'visible';
    winner.style.visibility = 'visible';
    document.getElementById('troffee').style.visibility = 'visible';
}

// ------------------------------------------- PLAY MENU -----------------------------------------------------------

function showPlayMenu() {
    playMenu.style.visibility = 'visible';
    playMenu.style.height = blueHeight;
    playMenu.style.width = blueWidth;
    playButton.style.visibility = 'visible';
    playerInput1.style.visibility = 'visible';
    playerInput2.style.visibility = 'visible';
    for (let i of playMenuElements) {
        i.style.visibility = 'visible';
    }
    playerInput1.value = "";
    playerInput2.value = "";

    player1.style.zIndex = -1;
    player2.style.zIndex = -1;

    pauseButton.style.visibility = 'hidden';
    smallPlayButton.style.visibility = 'hidden';
    gameResult.style.visibility = 'hidden';
    gameResult.style.height = '0';
    gameResult.style.width = '0';
    playAgain.style.visibility = 'hidden';
    winner.style.visibility = 'hidden';
    document.getElementById('troffee').style.visibility = 'hidden';

    player1Score.innerHTML = 0;
    player2Score.innerHTML = 0;
    pl1Score = 0;
    pl2Score = 0;
    gamePaused = true;
    restartGame();
};

restartButton.addEventListener('click', function () {
    clearTimeout(timeOutIntervalId);
    clearInterval(intervalID);
    showPlayMenu();
    startSound.play();
});

playButton.addEventListener('click', function () {
    startSound.play();
    if (playerInput1.value.length > 0 && playerInput2.value.length > 0) {
        playMenu.style.height = '0';
        playMenu.style.width = '0';
        playerInput1.style.visibility = 'hidden';
        playerInput2.style.visibility = 'hidden';
        playMenu.style.visibility = 'hidden';
        playButton.style.visibility = 'hidden';
        for (let i of playMenuElements) {
            i.style.visibility = 'hidden';
        }
        player1.innerHTML = playerInput1.value;
        player2.innerHTML = playerInput2.value;
        gamePaused = false;
        player1.style.zIndex = 2;
        player2.style.zIndex = 2;
        pauseButton.style.visibility = 'visible';
        timeOutIntervalId = setTimeout(moveBall, 3000);
    }
    else {
        window.alert("Please enter name of both the players !");
    }
})


playAgain.addEventListener('click', function () {
    startSound.play();
    showPlayMenu();
});
// moving the players-----------------------------------------------------------------------
var p1Pos = player1.getBoundingClientRect().left;
var p2Pos = player2.getBoundingClientRect().left;
window.addEventListener('keydown', function (event) {
    if (gamePaused) {

    }
    else if (event.key == 'a' || event.key == 'A') {

        if (p1Pos > 10) {
            p1Pos -= 25;
            player1.style.left = p1Pos + 'px';
        }
    }
    else if (event.key == 'd' || event.key == 'D') {
        if (p1Pos < window.innerWidth - player1.getBoundingClientRect().width - 30) {
            p1Pos += 25;
            player1.style.left = p1Pos + 'px';
        }
    }
    else if (event.key == 'ArrowLeft') {
        if (p2Pos > 10) {
            p2Pos -= 25;
            player2.style.left = p2Pos + 'px';
        }
    }
    else if (event.key == 'ArrowRight') {
        if (p2Pos < window.innerWidth - player2.getBoundingClientRect().width - 30) {
            p2Pos += 25;
            player2.style.left = p2Pos + 'px';
        }
    }
})

//******Play - pause events*********** */
smallPlayButton.addEventListener('click', function () {
    smallPlayButton.style.visibility = 'hidden';
    pauseButton.style.visibility = 'visible';
    gamePaused = false;
    pauseSound.play();
    moveBall();
})

pauseButton.addEventListener('click', function () {
    smallPlayButton.style.visibility = 'visible';
    pauseButton.style.visibility = 'hidden';
    gamePaused = true;
    pauseSound.play();
    clearTimeout(timeOutIntervalId);
    clearInterval(intervalID);
})

function resetBallPos() {
    ball.style.top = (window.innerHeight / 2 - ball.getBoundingClientRect().height / 2 - 200) + 'px';
    ball.style.left = window.innerWidth / 2 - ball.getBoundingClientRect().height / 2 + 'px';
}


// ----------------------------------------------Restart Game-------------------------------------------------
function resetPlayerPos() {
    player1.style.left = window.innerWidth / 2 - player1.getBoundingClientRect().width / 2 + 'px';
    player2.style.left = window.innerWidth / 2 - player2.getBoundingClientRect().width / 2 + 'px';
    p1Pos = player1.getBoundingClientRect().left;
    p2Pos = player2.getBoundingClientRect().left;
}

function restartGame() {
    xVel = 0;
    yVel = 0;
    resetBallPos();
    resetPlayerPos();
    setTimeout(function () {
        xVel = 2;
        yVel = 2;
    }, 2000);
}

//Announce Winner of Game
function announceWinner(playerNo) {
    victorySound.play();
    showWinnerCard();
    restartGame();
    gamePaused = true;
    pauseButton.style.visibility = 'hidden';
    player1.style.zIndex = -1;
    player2.style.zIndex = -1;
    smallPlayButton.style.visibility = 'hidden';
    pauseButton.style.visibility = 'hidden';
    smallPlayButton.style.visibility = 'hidden';
    if (playerNo === "player1") {
        let score = pl1Score - pl2Score;
        if (localStorage.getItem('highestScore') != null) {
            if (localStorage.getItem('highestScore') < score) {
                localStorage.setItem('highestScore', score);
                localStorage.setItem('highestScorer', player1.innerHTML);
                scoreDisplay.innerHTML = "Highest Score: " + localStorage.getItem('highestScore') + " by " + localStorage.getItem('highestScorer');

            }
        }
        else {
            localStorage.setItem('highestScore', score);
            localStorage.setItem('highestScorer', player1.innerHTML);
            scoreDisplay.innerHTML = "Highest Score: " + localStorage.getItem('highestScore') + " by " + localStorage.getItem('highestScorer');

        }
        winner.innerHTML = player1.innerHTML + " won !!";
    }
    else {
        let score = pl2Score - pl1Score;
        if (localStorage.getItem('highestScore') != null) {
            if (localStorage.getItem('highestScore') < score) {
                localStorage.setItem('highestScore', score);
                localStorage.setItem('highestScorer', player2.innerHTML);
                scoreDisplay.innerHTML = "Highest Score: " + localStorage.getItem('higestScore') + " by " + localStorage.getItem('highestScorer');
            }
        }
        else {
            localStorage.setItem('highestScore', score);
            localStorage.setItem('highestScorer', player2.innerHTML);
            scoreDisplay.innerHTML = "Highest Score: " + localStorage.getItem('highestScore') + " by " + localStorage.getItem('highestScorer');

        }
        winner.innerHTML = player2.innerHTML + " won !!";
    }
}

var xVel = 2;
var yVel = 2;
var tempPause = false;

// --------------------------- MOVE BALL FUNCTION -------------------------------------------

function moveBall() {
    let ballX = ball.getBoundingClientRect().x;
    let ballDiameter = ball.getBoundingClientRect().width;
    let ballY = ball.getBoundingClientRect().y;
    let player1Height = player1.getBoundingClientRect().height;
    intervalID = setInterval(function () {
        if (ballX + ballDiameter + 20 >= window.innerWidth || ballX - ballDiameter <= 0) {
            xVel = -xVel;
        }
        if (ballY <= player1Height) {
            yVel = -yVel;
            if (ballX > player1.getBoundingClientRect().right || ball.getBoundingClientRect().right < player1.getBoundingClientRect().left) {
                pl2Score += 1;
                player2Score.innerHTML = pl2Score;
                if (pl2Score == 11) {
                    announceWinner("player2");
                    clearInterval(intervalID);
                    return;
                }
                errorSound.play();
                tempPause = true;
                clearInterval(intervalID);
            }
            else {
                bounceSound.play();
            }
        }
        if (ballY + ballDiameter > window.innerHeight - player1Height) {
            yVel = -yVel;
            if (ballX > player2.getBoundingClientRect().right || ball.getBoundingClientRect().right < player2.getBoundingClientRect().left) {
                pl1Score += 1;
                player1Score.innerHTML = pl1Score;
                if (pl1Score == 11) {
                    announceWinner("player1");
                    clearInterval(intervalID);
                    return;
                }
                errorSound.play();
                tempPause = true;
                clearInterval(intervalID);
            }
            else {
                bounceSound.play();
            }
        }
        ballX += xVel;
        ballY += yVel;

        ball.style.top = ballY + 'px';
        ball.style.left = ballX + 'px';
    }, 5);
}

setInterval(function () {
    if (tempPause) {
        yVel = 2;
        resetBallPos();
        resetPlayerPos();
        tempPause = false;
        timeOutIntervalId = setTimeout(moveBall, 2000);
    }
}, 5);
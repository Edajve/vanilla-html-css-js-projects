const button = document.querySelector('.restart')
const dropDown = document.querySelector("#dropdown")
const timer = document.querySelector('.timer');
const scoreElement = document.querySelector('.score');
const boxes = document.querySelectorAll('.box-item')

const gameEnum = {
    READY : "ready",
    START : "start",
    RESET : "reset",
    ENDED : "ended"
}

const gameStats = {
    hasGameStarted: gameEnum.READY,
    sameTimeLimit: 5000, // 25000
    flashAttempts: 0,
    score: 0,
    accuracy: "0/0",
    difficulty: "Easy",
    addDifficulty(difficulty) {
        this.difficulty = difficulty
    },
    getStats() {
        return {...this}
    },
    getScore() {
        return this.score;
    },
    getAttempts() {
        return this.flashAttempts;
    },
    addScore() {
        this.score++;
    },
    addFlashAttempt() {
        this.flashAttempts++;
    },
    updateAccuracy(accuracyString) {
      this.accuracy = accuracyString;
    },
    updateStat(gameObject) {
        this.hasGameStarted = gameObject.hasGameStarted;
        this.score = gameObject.score;
        this.accuracy = gameObject.accuracy;
        this.difficulty = gameObject.difficulty;
        this.sameTimeLimit = gameObject.sameTimeLimit;
    }
}

const boardOperations = {
    board: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    getSize() {
        return this.board.length
    }
}

function handleStartResetButton() {
    button.innerHTML = button.innerHTML === 'Start' ? 'Reset' : 'Start'

    const gameStatus = button.innerHTML === "Start" ? gameEnum.READY : gameEnum.START;

    const newStats = {
        ...gameStats,
        hasGameStarted: gameStatus
    };
    gameStats.updateStat(newStats)

    prepUiForStartingGame()
}

function prepUiForStartingGame() {
    if (gameStats.getStats().hasGameStarted === gameEnum.START) {
        button.disabled = true;
        dropDown.disabled = true;
        startGameBasedOnDifficulty(gameStats.getStats())
    }
}

function startGameBasedOnDifficulty(stats) {
    let speedOfFlashMillisecond;
    let timeBetweenFlashes;
    switch (stats.difficulty) {
        case "Select Difficulty":
            speedOfFlashMillisecond = 2000;
            timeBetweenFlashes = 2000;
            start(speedOfFlashMillisecond, stats, timeBetweenFlashes)
            break
        case "Easy":
            speedOfFlashMillisecond = 1000;
            timeBetweenFlashes = 1000;
            start(speedOfFlashMillisecond, stats, timeBetweenFlashes)
            break
        case "Medium":
            speedOfFlashMillisecond = 850;
            timeBetweenFlashes = 850;
            start(speedOfFlashMillisecond, stats, timeBetweenFlashes)
            break
        case "Hard":
            speedOfFlashMillisecond = 700;
            timeBetweenFlashes = 700;
            start(speedOfFlashMillisecond, stats, timeBetweenFlashes)
            break
        case "Extreme":
            speedOfFlashMillisecond = 500;
            timeBetweenFlashes = 500;
            start(speedOfFlashMillisecond, stats, timeBetweenFlashes)
            break
        default:
            console.log("Level not available")
            break
    }
}

function start(millisecond, stats, timeBetweenFlashSpeed) {
    gameTimer(stats)

    function flashLoop() {
        if (gameStats.hasGameStarted === gameEnum.START) {
            flashRandomSquare(boardOperations, millisecond);
            setTimeout(flashLoop, timeBetweenFlashSpeed);
        }
    }

    flashLoop();
}

function gameTimer(statObject) {
    const startTime = new Date().getTime();
    const endTime = startTime + statObject.sameTimeLimit;

    function updateUiTimer() {
        const currentTime = new Date().getTime();
        const timeLeftInGame = Math.max(0, endTime - currentTime);
        timer.textContent = "Time Left: " + (timeLeftInGame / 1000).toFixed(2);

        if (timeLeftInGame <= 0) {
            const newStat = {...gameStats, hasGameStarted: gameEnum.ENDED};
            gameStats.updateStat(newStat);
            clearStatsAndUi()
            alert("Game over")
            clearStatsAndUi()
            return;
        }
        requestAnimationFrame(updateUiTimer);
    }
    updateUiTimer();
}
let userClicked = false;
function flashRandomSquare(boardObject, flashSpeed) {
    const randomIndex = Math.floor(Math.random() * boardObject.getSize());
    const moleImage = createMoleElement();
    boxes[randomIndex].appendChild(moleImage);

    boxes[randomIndex].addEventListener('click', function () {
        userClicked = true
        if (userClicked) {
            gameStats.addScore()
        }
        scoreElement.innerHTML = "Score: " + gameStats.getStats().score
    });

    userClicked = false;

    setTimeout(function () {
        moleImage.remove();
    }, flashSpeed);
}

function updateUiStats(correctAnswer) {
    gameStats.addFlashAttempt();
    if (correctAnswer) gameStats.addScore()
    const accuracyString = `${gameStats.getScore()}/${gameStats.getAttempts()}`
    gameStats.updateAccuracy(accuracyString)
    console.log(gameStats.getStats())
}

function createMoleElement() {
    const moleImage = document.createElement('img');
    moleImage.src = "./wack-a-mole.png";
    moleImage.classList.add('image');
    moleImage.classList.add('focused-box');
    return moleImage;
}

function getDropDownValue() {
    const selectedValue = dropDown.value;
    gameStats.addDifficulty(selectedValue);
}

function setDefaultSettings() {
    dropDown.value = "Select Difficulty"
}
function clearStatsAndUi() {
    button.innerHTML = "Start";
    button.disabled = false;
    dropDown.disabled = false;
    scoreElement.innerHTML = "Score: 0";

    const newStats = {
        ...gameStats,
        score: 0,
        flashAttempts: 0,
        hasGameStarted: gameEnum.READY
    };
    gameStats.updateStat(newStats);
}

dropDown.addEventListener('change', getDropDownValue)
button.addEventListener('click', handleStartResetButton)
window.addEventListener('load', setDefaultSettings) 
const gameArea = document.querySelector(".gameArea");
const scoreTable = document.getElementById("score");
const hScoreTable = document.getElementById("hscore");
let foodX;
let foodY;
let snakeX = 15;
let snakeY = 15;
let velocityX = 0;
let velocityY = 0;
let snakeBody = [];
let score = 0;
let hscore = localStorage.getItem("h-score") || 0;
hScoreTable.innerText = `High Score = ${hscore}`;

const changeDirection = (e) => {
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
    else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    game();
}
const changeFoodPlace = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const game = () => {
    let addHTML = `<div class="food" style="grid-area:${foodY}/${foodX} "></div>`


    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPlace();
        snakeBody.push([foodX, foodY]);
        score++;
        hscore = score >= hscore ? score : hscore;
        localStorage.setItem("h-score", hscore);
        scoreTable.innerHTML = `Score = ${score}`;
        hScoreTable.innerText = `High Score = ${hscore}`;
    }
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakeX, snakeY];

    snakeX += velocityX;
    snakeY += velocityY;

    if (snakeX <= -1 || snakeX > 31 || snakeY <= -1 || snakeY > 31) {
        clearInterval(diff);
        alert("Game Over! Please press OK to replay.");
        location.reload();
    }

    for (let i = 0; i < snakeBody.length; i++) {
        addHTML += `<div class="snake" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]} "></div>`;
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            clearInterval(diff);
            alert("Game Over! Please press OK to replay.");
            location.reload();
        }


    }

    gameArea.innerHTML = addHTML;
}

let diff = setInterval(game, 200);
document.addEventListener("keydown", changeDirection);
const easy = document.querySelector("#easy");
const medium = document.querySelector("#medium");
const hard = document.querySelector("#hard");
easy.addEventListener("click", () => {
    clearInterval(diff);
    diff = setInterval(game, 200);
});
medium.addEventListener("click", () => {
    clearInterval(diff);
    diff = setInterval(game, 125);
});
hard.addEventListener("click", () => {
    clearInterval(diff);
    diff = setInterval(game, 50);
});
changeFoodPlace();

game();
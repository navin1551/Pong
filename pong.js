let paddleHeight = 150;
let paddleWidth = 30;
let ballRadius = 25;
let halfPaddleHeight = paddleHeight / 2;
let speedOfPaddle1 = 0;
let speedOfPaddle2 = 0;
let positionOfPaddle1 = 220;
let positionOfPaddle2 = 220;
let topPositionOfBall = 510;
let leftPositionOfBall = 820;
let topSpeedOfBall = 10;
let leftSpeedOfBall = 0;
let score1 = 0;
let score2 = 0;

// 2 players

// Start of game and speed and direction of ball movement
function startBall() {
  topPositionOfBall = 510;
  leftPositionOfBall = 820;

  if (Math.random() < 0.5) {
    side = 1;
  } else {
    side = -1;
  }

  leftSpeedOfBall = side * (Math.random() * 6 + 5);
  topSpeedOfBall = Math.random() * 6 + 5;
}

document.addEventListener("keydown", function(e) {
  //W
  if (e.keyCode === 87 || e.which === 87) {
    speedOfPaddle1 = -10;
  }
  //S
  if (e.keyCode === 83 || e.which === 83) {
    speedOfPaddle1 = 10;
  }
  //Up
  if (e.keyCode === 38 || e.which === 38) {
    speedOfPaddle2 = -10;
  }
  //Down
  if (e.keyCode === 40 || e.which === 40) {
    speedOfPaddle2 = 10;
  }
});

document.addEventListener("keyup", function(e) {
  //W
  if (e.keyCode === 87 || e.which === 87) {
    speedOfPaddle1 = 0;
  }
  //S
  if (e.keyCode === 83 || e.which === 83) {
    speedOfPaddle1 = 0;
  }
  //Up
  if (e.keyCode === 38 || e.which === 38) {
    speedOfPaddle2 = 0;
  }
  //Down
  if (e.keyCode === 40 || e.which === 40) {
    speedOfPaddle2 = 0;
  }
});

window.setInterval(function show() {
  positionOfPaddle1 += speedOfPaddle1;
  positionOfPaddle2 += speedOfPaddle2;

  topPositionOfBall += topSpeedOfBall;
  leftPositionOfBall += leftSpeedOfBall;

  //Stop paddle from leaving top of screen
  if (positionOfPaddle1 <= 1) {
    positionOfPaddle1 = 1;
  }

  if (positionOfPaddle2 <= 1) {
    positionOfPaddle2 = 1;
  }

  //Stop paddle from leaving bottom of screen
  if (positionOfPaddle1 >= window.innerHeight - paddleHeight) {
    positionOfPaddle1 = window.innerHeight - paddleHeight;
  }

  if (positionOfPaddle2 >= window.innerHeight - paddleHeight) {
    positionOfPaddle2 = window.innerHeight - paddleHeight;
  }

  if (
    topPositionOfBall <= 10 ||
    topPositionOfBall >= window.innerHeight - ballRadius
  ) {
    topSpeedOfBall = -topSpeedOfBall;
  }

  if (leftPositionOfBall <= paddleWidth) {
    if (
      topPositionOfBall > positionOfPaddle1 &&
      topPositionOfBall < positionOfPaddle1 + paddleHeight
    ) {
      leftSpeedOfBall = -leftSpeedOfBall;
    } else {
      score2++;
      startBall();
    }
  }

  if (leftPositionOfBall >= window.innerWidth - ballRadius - paddleWidth) {
    if (
      topPositionOfBall > positionOfPaddle2 &&
      topPositionOfBall < positionOfPaddle2 + paddleHeight
    ) {
      leftSpeedOfBall = -leftSpeedOfBall;
    } else {
      score1++;
      startBall();
    }
  }

  document.getElementById("paddle1").style.top = positionOfPaddle1 + "px";
  document.getElementById("paddle2").style.top = positionOfPaddle2 + "px";

  document.getElementById("ball").style.top = topPositionOfBall + "px";
  document.getElementById("ball").style.left = leftPositionOfBall + "px";

  document.getElementById("score1").innerHTML = score1.toString();
  document.getElementById("score2").innerHTML = score2.toString();
}, 1000 / 60);

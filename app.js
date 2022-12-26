const canvas = document.getElementById('canvas');

const width = canvas.width;
const height = canvas.height;

const ctx = canvas.getContext('2d');

class Ball {
  constructor(x, y, speed, radius, color) {
    this.x = x;
    this.y = y;
    this.velX = speed;
    this.velY = speed;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  bounce() {
    if (this.x + this.radius >= width || this.x - this.radius <= 0) {
      this.velX *= -1; // 벽에 부딪히면 반대방향으로 이동
    }

    if (this.y + this.radius >= height || this.y - this.radius <= 0) {
      this.velY *= -1;
    }

    // 좌표에 속도를 붙여 공이 움직이게 함
    this.x += this.velX;
    this.y += this.velY;
  }
}

// 랜덤 함수 (공의 움직임과 색깔을 랜덤으로 조정)
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let powerCnt = 0; // 거듭제곱할 횟수
let poweredBallCnt = 1; // (거듭제곱으로 생성되는) 공의 개수

let balls = [];

let x = 10;
let y = 10;
let radius = 5;

function createBall() {
  while (balls.length < poweredBallCnt) {
    // ballCnt가 거듭제곱된 상태이면
    if (poweredBallCnt > 1) {
      // 공이 생성되는 좌표값을 랜덤하게 만듦
      x = random(radius, width - radius);
      y = random(radius, height - radius);
    }

    const ball = new Ball(
      x,
      y,
      5,
      radius,
      `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})` // 공에 랜덤색 부여
    );

    balls.push(ball);
  }
}

let isPaused = false;
let myReq; // cancelAnimation의 기준

function animate() {
  // (다음 애니메이션을 그리기 전) 이전 캔버스 초기화
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, width, height);

  balls.map((ball) => {
    ball.draw();
    ball.bounce();
  });

  // 일시정지 상태가 아닐 때 애니메이션 실행
  if (!isPaused) {
    myReq = requestAnimationFrame(animate);
  }
}

// 버튼 활성화
function activeButton(button) {
  button.style.color = '#000';
  button.style.cursor = 'pointer';
  button.style.backgroundColor = '#eee';
  button.style.pointerEvents = 'auto';
}

// 버튼 비활성화
function inactiveButton(button) {
  button.style.color = '#c5c5c5';
  button.style.cursor = 'default';
  button.style.backgroundColor = '#eee';
  button.style.pointerEvents = 'none';
}

// 시작 버튼
const startButton = document.getElementById('start');
startButton.addEventListener('click', () => {
  createBall();
  inactiveButton(startButton);

  activeButton(pauseButton);
  activeButton(copyButton);
  activeButton(stopButton);

  myReq = requestAnimationFrame(animate);
});

// 일시정지/다시재생 버튼
const pauseButton = document.getElementById('pause');
pauseButton.addEventListener('click', () => {
  isPaused = !isPaused;

  if (isPaused) {
    pauseButton.innerText = '다시재생';
  } else {
    pauseButton.innerText = '일시정지';
  }

  if (!isPaused) {
    myReq = requestAnimationFrame(animate);
  }
});

// 복제 버튼
const copyButton = document.getElementById('copy');
copyButton.addEventListener('click', () => {
  powerCnt++;
  poweredBallCnt = Math.pow(4, powerCnt);

  createBall();

  if (isPaused) {
    balls.map((ball) => {
      ball.draw();
    });

    myReq = requestAnimationFrame(animate);
  }
});

// 멈춤 버튼
const stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => {
  inactiveButton(stopButton);
  inactiveButton(pauseButton);
  inactiveButton(copyButton);

  // 모두 초기화
  balls = [];
  powerCnt = 0;
  poweredBallCnt = 1;
  isPaused = false;

  // 3D 애니메이션 삭제
  cancelAnimationFrame(myReq);

  // 2D 화면 삭제
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  activeButton(startButton);
});

window.onload = () => {
  inactiveButton(pauseButton);
  inactiveButton(copyButton);
  inactiveButton(stopButton);
};

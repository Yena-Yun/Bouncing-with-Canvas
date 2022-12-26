import Ball from './ball.js';
import { ctx, width, height } from './canvas.js';
import { random, activeButton, inactiveButton } from './utils.js';

let balls = [];
let x = 10;
let y = 10;
let radius = 5;

let powerCnt = 0; // 거듭제곱할 횟수
let poweredBallCnt = 1; // (거듭제곱으로 생성되는) 공의 개수

function createBall() {
  while (balls.length < poweredBallCnt) {
    // ballCnt가 거듭제곱된 상태이면
    if (poweredBallCnt > 1) {
      // 공이 생성되는 좌표에 랜덤한 좌표값 부여
      x = random(radius, width - radius);
      y = random(radius, height - radius);
    }

    const ball = new Ball(
      x,
      y,
      5,
      radius,
      `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})` // 공에 랜덤한 색상 부여
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

// 첫 렌더링 시
window.onload = () => {
  inactiveButton(pauseButton);
  inactiveButton(copyButton);
  inactiveButton(stopButton);
};

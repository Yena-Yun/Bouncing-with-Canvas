// 랜덤 함수 (공의 움직임과 색깔을 랜덤으로 조정)
export const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// 버튼 활성화
export const activeButton = (button) => {
  button.style.color = '#000';
  button.style.cursor = 'pointer';
  button.style.backgroundColor = '#eee';
  button.style.pointerEvents = 'auto';
};

// 버튼 비활성화
export const inactiveButton = (button) => {
  button.style.color = '#c5c5c5';
  button.style.cursor = 'default';
  button.style.backgroundColor = '#eee';
  button.style.pointerEvents = 'none';
};

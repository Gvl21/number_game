// q1. 1-100까지 랜덤한 숫자 (정스를 반환하는 변수) randomNumber를 선언하고 초기화하세요Math.random
let num = 100;
let randomNumber = Math.floor(Math.random() * num) + 1;
// 2. DOM 요소 5가지를 선택해서 변수로 선언해주세요
const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');
const guessLog = document.querySelector('.guessLog');
// 3. 변수 2가지를 선언해주세요
let guessCount = 1;
let restButton;

// 이벤트 리스너 만들기 클릭했을때 checkGuess함수를 실행하는 리스너 추가
function checkGuess(e) {
  e.preventDefault();
  // 사용자가 추측한 번호를 알아내는 변수
  const userGuess = Number(guessField.value);
  if (userGuess <= 0 || userGuess > 100) {
    lastResult.textContent = '잘못된 숫자를 기입하셨어요!';
    guessCount--;
  } else if (userGuess === randomNumber) {
    lastResult.textContent = `축하합니다! ${guessCount}번 만에 맞추셨어요.`;
    lowOrHi.textContent = '';
    // 추측 차단 & 다시시작버튼
    setGameOver();
  } else if (guessCount === 10) {
    lastResult.textContent = '게임오버! 10회를 모두 사용하셨습니다.';
    lowOrHi.textContent = `정답은 ${randomNumber}이었습니다.`;
    setGameOver();
  } else if (userGuess > randomNumber) {
    lowOrHi.textContent = `${userGuess}보다 더 낮은 숫자입니다.`;

    lastResult.textContent = '';
    guessLog.textContent += `${userGuess}>?`;
  } else if (userGuess < randomNumber) {
    lowOrHi.textContent = `${userGuess}보다 더 높은 숫자입니다.`;

    lastResult.textContent = '';
    guessLog.textContent += `${userGuess}<?`;
  }

  guessCount++;
  guessField.focus();
  guessField.value = '';
}

function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  // 버튼태그인 리셋버튼을 생성하기
  restButton = document.createElement('button');
  restButton.textContent = '다시하기';
  document.body.appendChild(restButton);
  restButton.addEventListener('click', resetGame);
}
// 올바른 번호인지 확인하는 함수를 만들기
function resetGame() {
  guessCount = 1;
  guessField.disabled = false;
  guessSubmit.disabled = false;
  restButton.parentNode.removeChild(restButton);
  randomNumber = Math.floor(Math.random() * num) + 1;
  guessField.value = '';
  lastResult.textContent = '';
  lowOrHi.textContent = '';
  guessLog.textContent = '';
}
guessSubmit.addEventListener('click', checkGuess);

// 플레이어가 켜져 있는 턴 번호를 기록합니다. 1에서 시작하십시오.
//       플레이어에게 숫자가 무엇인지 추측할 수 있는 방법을 제공하십시오.
// 추측이 제출되면 사용자가 이전 추측을 볼 수 있도록 먼저 어딘가에 기록합니다.
// 다음으로 올바른 번호인지 확인하십시오.
// 올바른 경우:
//    축하 메시지를 표시합니다.
//    플레이어가 더 많은 추측을 입력할 수 없도록 합니다(이렇게 하면 게임이 엉망이 됩니다).
//    플레이어가 게임을 다시 시작할 수 있도록 하는 디스플레이 컨트롤.
// 그것이 틀렸고 플레이어가 왼쪽 턴을 가졌다면:
//    플레이어에게 자신이 틀렸으며 추측이 너무 높거나 낮은지 알려줍니다.
//    그들이 다른 추측을 입력하도록 허용하십시오.
//    턴 번호를 1씩 증가시킵니다.
// 틀렸고 플레이어에게 남은 턴이 없다면:
//    플레이어에게 게임이 끝났음을 알립니다.
//    플레이어가 더 많은 추측을 입력할 수 없도록 합니다(이렇게 하면 게임이 엉망이 됩니다).
//    플레이어가 게임을 다시 시작할 수 있도록 하는 디스플레이 컨트롤.
// 게임이 다시 시작되면 게임 로직과 UI가 완전히 재설정되었는지 확인한 다음 1단계로 돌아갑니다.

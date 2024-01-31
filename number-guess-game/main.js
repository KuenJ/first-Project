//랜덤번호 지정
//유저가 번호를 입력한다 그리고 go라는 버튼을 누름
//만약에 유저가 랜덤번호를 맞추면 맞췄습니다,
//랜덤번호가 <유저번호보다 작다면 down !
//랜덤번호가 > 유전번호보다 크다면 up!.
//버튼누르면 게임 reset
//5번의 기회를 다쓰면 게임이 끝. (더이상 추측불가 ,버튼이 disabled)
//유저가 1~100 범위밖에숫자를 입력하면 알려준다 .
//기회를 깎지않는다.
//유저가 이미 입력한숫자를 입력하면 알려준다 .기회를 깎지않음 .

let randomNumber = 0;
let playButton = document.getElementById("go-button");
let userInput = document.getElementById("user-input");
let resetButton = document.getElementById("reset-button");
let inputCounter = document.getElementById("input-Counter");
let chanceArea = document.getElementById("chance-area");

userInput.addEventListener("focus", function () {
  userInput.value = "";
});

let history = [];

let chances = 5;

let gameOver = false;

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);

function getRandomNumber() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  console.log("정답", randomNumber);
}

function play() {
  let inputValue = userInput.value;

  if (inputValue < 1 || inputValue > 100) {
    inputCounter.textContent = "1과100사이의 숫자를 입력해주세요";
    return;
  }
  if (history.includes(inputValue)) {
    inputCounter.textContent = "이미입력한숫자닝께 다른거 입력혀~.";
    return;
  }

  chances--; //클릭할때마다 기회가 줄어든다 .

  chanceArea.textContent = `남은찬스 ${chances}번`;

  if (inputValue < randomNumber) {
    inputCounter.textContent = "UP!!!!";
  } else if (inputValue > randomNumber) {
    inputCounter.textContent = "DOWN!!!!";
  } else {
    inputCounter.textContent = "정답입니다.!!!!";
    playButton.disabled = true;
  }
  history.push(inputValue);
  console.log(history);

  if (chances < 1) {
    gameOver = true;
    chanceArea.textContent = "그걸못맞춘겨?  마시면서 배우는겨 ";
  }
  if (gameOver == true) {
    playButton.disabled = true;
  }
}

function reset() {
  //userInput 창이 깨끗하게 정리되고

  //새로운번호가생성되고.
  userInput.value = "";
  getRandomNumber();
  inputCounter.textContent = "여기여 정답은 여기란말이여.";
  chances = 5; //찬스 5번
  chanceArea.textContent = `남은찬스 ${chances}번`;

  gameOver = false; //게임오버 상태초기화
  playButton.disabled = false;
  history = [];
}

getRandomNumber();

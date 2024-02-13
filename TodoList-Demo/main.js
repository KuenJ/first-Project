//user가 값을 입력한다
//+버튼 클릭시 할일 추가된다.
//delete버튼누르면 할일 삭제된다.
//check 버튼을 누르면 할일이 끝나면서 밑줄이간다.

//1.check버튼을 클릭하는순간 true false
//2. true이면 끝난걸로 간주하고 밑줄보여주기
//3. false이면 안끝난걸로 간주하고 그대로

//진행중 끝남 탭을누르면 ,언더바가 이동한다
//끝남탭은 , 끝남 아이템만 ,진행
//전체탭을 누르면 다시 전체아템으로 돌아옴

let taskInput = document.getElementById("task-input"); // input 창의 id를주고 getElementByID로  해당 id 적용한것
let addButton = document.getElementById("add-button"); // 버튼의 속성값을가져온다
let tabs = document.querySelectorAll(".task-tabs div"); //조건의 만족하는 모든것을 가져온다 querySelectorAll은

let taskList = [];
let mode = "all";
let filterList = [];
addButton.addEventListener("click", addTask); //버튼에 click시 해당 함수가 동작하도록하는  addEventListener

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
    moveUnderline(event.target);
  });
}

console.log(tabs);
function addTask() {
  // let taskContent = taskInput.value; //input 란에 입력된 값을  가져오는것이다

  //필요한정보를 하나로묶어주는것 (객체)
  let task = {
    id: randomIDGenerate(), // 랜덤하게 아이디를 지정해줘서삭제할때  고유값이 있으니 체크해서 삭제가능하게함 .

    taskContent: taskInput.value,
    isComplete: false, //끝나는지안끝났는지 확인  false릴 기본
  };
  taskList.push(task); // 배열에 입력된 input값을 밀어넣는것이다.

  console.log(taskList);
  render();
}

function render() {
  //1.내가 선택한 탭에따라서  값을 집어넣을수있는 list라는 빈배열선언 .
  let list = [];
  if (mode === "all") {
    list = taskList;
  } else if (mode === "ongoing") {
    list = filterList;
  } else if (mode === "done") {
    list = filterList;
  }

  //2. 리스트를 달리 보여준다.

  // all taskList 보여주고
  // ongoing ,done  filter List
  let resultHTML = ""; //resultHTML은 문자열 변수로, 각 할 일을 HTML 형식으로 변환한 후 이 변수에 추가합니다. 초기에는 빈 문자열로 시작합니다.
  for (let i = 0; i < list.length; i++) {
    //상황에따라서 값을 달리보여야하기때문에 taskList가아닌 list를넣어야함  위
    if (list[i].isComplete == true) {
      resultHTML += `    
            <div class="task">
                    <div class ="task-done">${list[i].taskContent}</div>    
                    <div>
                      <button onclick="toggleComplete('${list[i].id}')">Check</button>    
                       <button onclick="deleteTask('${list[i].id}')">Delete</button>
                    </div>
                </div>
      `;
    } else {
      resultHTML += `    
            <div class="task">
                    <div>${list[i].taskContent}</div>    
                    <div>
                      <button onclick="toggleComplete('${list[i].id}')">Check</button>    
                       <button onclick="deleteTask('${list[i].id}')">Delete</button>
                    </div>
                </div>
      `;
    }
    //배열에있는 아이템들을 하나하나 꺼내서 무엇인가 할려한다 그것은   내용 html을 생성하는것이다.
    // 아래 출력 tasList[i]이후에 .taskContent로 객체안에 정확히무엇을 출력해줄것인지정해주어야함 .
  } //버튼 클릭시  ${taskList[i].id}의 속성을받아서 체크 클릭시 함수가 실행된다.

  document.getElementById("task-board").innerHTML = resultHTML; //task-board에 .innerHtml은 붙여넣을것이다 . 라는의미 =resultHtml을 붙혀넣겠다.
}

function toggleComplete(id) {
  // 위에 addButton처럼 선언해서  주는방식과 직접적으로 button에 onclick을줘서 하는방식이있음, id 값을 받아와서 체크가 된다.
  //for문을 사용해서 배열의 크기만큼 반복해서  만약에 tasklist  i번째의 아이템이내 내가 지금받은 매개변수와 같다면  isComplete를 true로 만든다음에 멈춘다 .
  // id가 맞다면 버튼 클릭시 밑줄이가야하는데 render함수를 불러와야한다
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList[i].isComplete = !taskList[i].isComplete; //!taskList[i].iscomplte를하게되면 체크 같은걸  왔다갔다할수있다. 체크 , 미체크 둘다 된다 .
      break;
    }
  }
  render();
  console.log(taskList);
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList.splice(i, 1);
      break;
    }
  }
  render();
}

function filter(event) {
  //event는 내가 누그를 클릭했는지에 대한 정보를 가지고있음
  mode = event.target.id;
  filterList = []; // 현재진행중인아이템을 모아주는 리스트   let fileterList =[] 로 선언되어있지만 탭을눌렀을경우  저값들을 반환하기위해 let을 지우고 위에 선언해서 전역변수로 선언한다 .
  console.log("filter", event.target); //  event.target은 클릭된 버튼요소를 가르킨다.
  if (mode === "all") {
    //전체리스트를 보여준다

    render();
  } else if (mode === "ongoing") {
    // 진행중인 아이템을보여준다
    //task.isComplete=false

    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
    render();
    console.log("진행중", filterList);
  } else if (mode === "done") {
    // 끝나는  케이스
    //task.isComplete=true
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}
render();
function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
function moveUnderline(target) {
  let underLine = document.getElementById("under-line");
  let tabPosition = target.getBoundingClientRect(); // 클릭된 탭의 위치 가져오기
  let taskTabsPosition = document
    .querySelector(".task-tabs")
    .getBoundingClientRect(); // task-tabs 컨테이너의 위치 가져오기
  let offset = tabPosition.left - taskTabsPosition.left; // 왼쪽으로부터의 오프셋 계산

  underLine.style.transform = `translateX(${offset}px)`; // under-line 이동
}

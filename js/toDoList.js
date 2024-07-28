// todolist.js

// 날짜 표시 함수
function displayDates() {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const dateElements = document.querySelectorAll(".date");
  [yesterday, today, tomorrow].forEach((date, index) => {
    const dayOfWeek = days[date.getDay()];
    const formattedDate = `${
      date.getMonth() + 1
    }월 ${date.getDate()}일 (${dayOfWeek})`;
    dateElements[index].textContent = formattedDate;
  });
}

// localStorage에서 todo 목록 가져오기
function getTodos() {
  const currentUser = window.getCurrentUser();
  const todos = JSON.parse(localStorage.getItem(currentUser)) || {
    yesterday: [],
    today: [],
    tomorrow: [],
  };
  return todos;
}
// localStorage에 todo 목록 저장하기
function saveTodos(todos) {
  const currentUser = window.getCurrentUser();
  localStorage.setItem(currentUser, JSON.stringify(todos));
}

// todo 목록 표시하기
function displayTodos() {
  const todos = getTodos();
  ["yesterday", "today", "tomorrow"].forEach((day) => {
    const tasksList = document.querySelector(`.${day} .tasks`);
    tasksList.innerHTML = "";
    todos[day].forEach((todo, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <input type="radio" class="task-radio" ${
          todo.completed ? "checked" : ""
        }>
        <span class="task-text ${todo.completed ? "completed" : ""}">${
        todo.text
      }</span>
        <button class="task-delete">Delete</button>
      `;
      li.querySelector(".task-radio").addEventListener("click", (e) =>
        toggleTask(day, index)
      );
      li.querySelector(".task-delete").addEventListener("click", () =>
        deleteTask(day, index)
      );
      tasksList.appendChild(li);
    });
  });
}
// 할 일 추가 함수
function addTodo(button) {
  const todoContainer = button.closest(".todo-container");
  const day = todoContainer.classList[1]; // yesterday, today, or tomorrow
  const todoText = prompt("할 일을 입력하세요:");

  if (todoText) {
    const todos = getTodos();
    todos[day].push({ text: todoText, completed: false });
    saveTodos(todos);
    displayTodos();
  }
}

// todo 리스트 초기화 함수
function clearTodos() {
  ["yesterday", "today", "tomorrow"].forEach((day) => {
    document.querySelector(`.${day} .tasks`).innerHTML = "";
  });
}

// 할 일 완료 상태 토글 함수
function toggleTask(day, index) {
  const todos = getTodos();
  todos[day][index].completed = !todos[day][index].completed;
  saveTodos(todos);
  displayTodos();
}

// 할 일 삭제 함수
function deleteTask(day, index) {
  const todos = getTodos();
  todos[day].splice(index, 1);
  saveTodos(todos);
  displayTodos();
}

// 버튼 활성화/비활성화 함수
function toggleAddTaskButtons(isLoggedIn) {
  const addButtons = document.querySelectorAll(".add-task");
  addButtons.forEach((button) => {
    if (isLoggedIn) {
      button.classList.remove("disabled");
      button.disabled = false;
    } else {
      button.classList.add("disabled");
      button.disabled = true;
    }
  });
}

// 이벤트 리스너 설정
document.addEventListener("DOMContentLoaded", () => {
  displayDates();

  const addButtons = document.querySelectorAll(".add-task");
  addButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (!button.classList.contains("disabled")) {
        addTodo(button);
      }
    });
  });

  // 초기 로그인 상태 확인 및 버튼 상태 설정
  const isLoggedIn = !!localStorage.getItem("currentUser");
  toggleAddTaskButtons(isLoggedIn);
});

// 다른 파일에서 사용할 수 있도록 전역으로 노출
window.displayTodos = displayTodos;
window.clearTodos = clearTodos;
window.toggleAddTaskButtons = toggleAddTaskButtons;
ㅍ;

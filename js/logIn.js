// login.js

let currentUser = null;

function login(username) {
  currentUser = username;
  localStorage.setItem("currentUser", username);
  document.getElementById("logIn").classList.add("hidden");
  document.getElementById("userInfo").classList.remove("hidden");
  document.querySelector("#userInfo #name").textContent = `Hello ${username}`;
  // todo 리스트 표시 함수 호출
  if (typeof displayTodos === "function") {
    displayTodos();
  }
  // 버튼 활성화
  if (typeof toggleAddTaskButtons === "function") {
    toggleAddTaskButtons(true);
  }
}

function logout() {
  currentUser = null;
  localStorage.removeItem("currentUser");
  document.getElementById("logIn").classList.remove("hidden");
  document.getElementById("userInfo").classList.add("hidden");
  document.querySelector("#logIn input").value = "";
  // todo 리스트 초기화
  if (typeof clearTodos === "function") {
    clearTodos();
  }
  // 버튼 비활성화
  if (typeof toggleAddTaskButtons === "function") {
    toggleAddTaskButtons(false);
  }
}

// 이벤트 리스너 설정
document.addEventListener("DOMContentLoaded", () => {
  // 로그인 폼 제출 이벤트 리스너
  document.getElementById("logIn").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.querySelector("#logIn input").value;
    login(username);
  });

  // 로그아웃 버튼 이벤트 리스너
  document.getElementById("logoutButton").addEventListener("click", logout);

  // 저장된 사용자가 있다면 자동 로그인
  const savedUsername = localStorage.getItem("currentUser");
  if (savedUsername) {
    login(savedUsername);
  } else {
    // 저장된 사용자가 없다면 버튼 비활성화
    if (typeof toggleAddTaskButtons === "function") {
      toggleAddTaskButtons(false);
    }
  }
});

// 다른 파일에서 사용할 수 있도록 전역으로 노출
window.getCurrentUser = () => currentUser;

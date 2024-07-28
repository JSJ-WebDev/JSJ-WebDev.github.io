const clock = document.getElementById("clock");

const images = [
  "url('img/img0.jpg')",
  "url('img/img1.jpg')",
  "url('img/img2.jpg')",
  "url('img/img3.jpg')",
  "url('img/img4.jpg')",
  "url('img/img5.jpg')",
  "url('img/img6.jpg')",
  "url('img/img7.jpg')",
  "url('img/img8.jpg')",
];

function getClock() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  clock.innerText = `${hours}:${minutes}:${seconds}`;
}

function changeBackground() {
  const bg = document.getElementById("background");
  const randomIndex = Math.floor(Math.random() * images.length);
  bg.style.backgroundImage = images[randomIndex];
}

// 페이지 로드 시 배경 변경
changeBackground();
getClock();

setInterval(getClock, 1000);

document.addEventListener("DOMContentLoaded", changeBackground);

// declare variable
const cursor = document.querySelector(".cursor");
const bgmController = document.querySelector(".bgm-controller");
const CD = document.querySelector(".cd");
const CD2 = document.querySelector(".cd2");
const bgm = document.querySelector("audio");

// mouse
let rad = 0;

addEventListener("mousemove", (event) => {
  cursor.style.display = "block";
  var x = event.clientX - 24;
  var y = event.clientY - 24;
  // if (Math.abs(event.movementX) + Math.abs(event.movementY) > 6) {
  //     rad = Math.atan2(event.movementX, -event.movementY)
  // }
  cursor.style.transform = `translate(${x}px, ${y}px) rotate(${rad}rad)`;
});

addEventListener("mouseout", (event) => {
  cursor.style.display = "none";
});

// bgm
bgmController.addEventListener("click", playOrPauseBGM);

function playOrPauseBGM() {
  if (bgm.paused) {
    CD.classList.add("spin");
    CD2.classList.add("rotate30");
    setTimeout(() => {
      bgm.play();
    }, 500);
  } else {
    bgm.pause();
    CD.classList.remove("spin");
    CD2.classList.remove("rotate30");
  }
}
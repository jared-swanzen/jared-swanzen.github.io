const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");
const yay = document.getElementById("yay");
const choice = document.getElementById("choice");

let pointerX = 0;
let pointerY = 0;
let fleeCount = 0;

/* Mouse + touch tracking */
function updatePointer(x, y) {
  pointerX = x;
  pointerY = y;
}

document.addEventListener("mousemove", e =>
  updatePointer(e.clientX, e.clientY)
);

document.addEventListener("touchmove", e => {
  const t = e.touches[0];
  if (t) updatePointer(t.clientX, t.clientY);
});

function moveNoButton() {
  const padding = 20;
  const rect = noBtn.getBoundingClientRect();

  const maxX = window.innerWidth - rect.width - padding;
  const maxY = window.innerHeight - rect.height - padding;

  let x, y;

  do {
    x = Math.random() * maxX;
    y = Math.random() * maxY;
  } while (
    pointerX >= x &&
    pointerX <= x + rect.width &&
    pointerY >= y &&
    pointerY <= y + rect.height
  );

  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";

  fleeCount++;
  if (fleeCount >= 5) {
    yesBtn.classList.add("pulse");
  }
}

/* Initial No position */
const yesRect = yesBtn.getBoundingClientRect();
noBtn.style.left = yesRect.right + 20 + "px";
noBtn.style.top = yesRect.top + "px";

/* Desktop + mobile escape */
noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("touchstart", moveNoButton);

/* Emergency overlap detection */
setInterval(() => {
  const rect = noBtn.getBoundingClientRect();
  if (
    pointerX >= rect.left &&
    pointerX <= rect.right &&
    pointerY >= rect.top &&
    pointerY <= rect.bottom
  ) {
    moveNoButton();
  }
}, 40);

/* Yay screen */
yesBtn.addEventListener("click", () => {
  yay.style.display = "flex";
  choice.style.display = "none";
});

/* Floating hearts */
const heartsContainer = document.getElementById("hearts");

setInterval(() => {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = "💖";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 20 + 16 + "px";
  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}, 300);
const polaroidContainer = document.getElementById("polaroids");

// 🔁 Replace these with your own images
const photos = [
  "images/1.jpg",
  "images/2.jpg",
  "images/3.jpeg",
  "images/4.jpeg",
  "images/5.jpeg",
  "images/6.jpeg",
  "images/7.jpeg",
  "images/8.jpeg", 
  "images/9.jpeg",
  "images/10.jpeg",
  "images/11.jpeg",
  "images/12.jpeg",
];

const remaining = photos.sort(() => Math.random() - 0.5);

const POLAROID_COUNT = 8;
const positions = generatePositions(POLAROID_COUNT);

function generatePositions(count) {
  const positions = [];

  const cols = Math.ceil(Math.sqrt(count));
  const rows = Math.ceil(count / cols);

  const cellW = window.innerWidth / cols;
  const cellH = window.innerHeight / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      positions.push({
        x: c * cellW + Math.random() * (cellW - 180),
        y: r * cellH + Math.random() * (cellH - 200)
      });
    }
  }

  return positions
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}

function createPolaroid(position) {
  if (remaining.length === 0) return;

  const src = remaining.pop();

  const wrapper = document.createElement("div");
  wrapper.className = "polaroid";

  const img = document.createElement("img");
  img.src = src;

  const rotation = Math.random() * 40 - 20; // -20° to +20°
  const x = Math.random() * (window.innerWidth - 180);
  const y = Math.random() * (window.innerHeight - 200);

  wrapper.style.left = x + "px";
  wrapper.style.top = y + "px";
  wrapper.style.transform = `rotate(${rotation}deg)`;

  wrapper.appendChild(img);
  polaroidContainer.appendChild(wrapper);
}

positions.forEach(pos => createPolaroid(pos));

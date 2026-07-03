const previousData = document.getElementById("previous-data");
const input = document.getElementById("fdio-input");

function random4Digit() {
  return String(Math.floor(Math.random() * 10000)).padStart(4, "0");
}

input.addEventListener("keydown", function (e) {
  const start = input.selectionStart;
  const end = input.selectionEnd;
  const value = input.value;

  if (e.key === " ") {
    e.preventDefault();
    input.value = value.slice(0, start) + "\n" + value.slice(end);
    input.selectionStart = input.selectionEnd = start + 1;
    return;
  }

  if (e.key === "`") {
    e.preventDefault();
    input.value = value.slice(0, start) + "FD" + value.slice(end);
    input.selectionStart = input.selectionEnd = start + 2;
    return;
  }

  if (e.key === ".") {
    e.preventDefault();
    const triangle = "▲";
    input.value = value.slice(0, start) + triangle + value.slice(end);
    input.selectionStart = input.selectionEnd = start + 1;
    return;
  }

  if (e.key === "Enter") {
    e.preventDefault();

    const text = input.value.trim().toUpperCase();
    if (text === "") return;

    const code = random4Digit();

    const record = `${code} ${text}`;

    previousData.value = record;
    input.value = "";
  }
});



const radarBackground = document.getElementById("radar-background");

const CRQ = {
  lat: 33.1283,
  lon: -117.28,
  elevation: 330,
  classDRadiusNM: 4.5,
  classDCeilingAGL: 2500
};

function nmToPixels(nm) {
  const pixelsPerNM = 30;
  return nm * pixelsPerNM;
}

function createRadarGrid() {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const maxRadius = Math.max(window.innerWidth, window.innerHeight);

  for (let i = 1; i <= 5; i++) {
    const circle = document.createElement("div");
    circle.style.position = "absolute";
    circle.style.left = centerX + "px";
    circle.style.top = centerY + "px";
    circle.style.width = (maxRadius * 0.2 * i) + "px";
    circle.style.height = (maxRadius * 0.2 * i) + "px";
    circle.style.border = "1px solid rgba(0, 255, 0, 0.3)";
    circle.style.borderRadius = "50%";
    circle.style.transform = "translate(-50%, -50%)";
    radarBackground.appendChild(circle);
  }

  for (let i = 0; i < 12; i++) {
    const line = document.createElement("div");
    line.style.position = "absolute";
    line.style.left = centerX + "px";
    line.style.top = centerY + "px";
    line.style.width = "2px";
    line.style.height = (maxRadius * 0.6) + "px";
    line.style.background = "rgba(0, 255, 0, 0.2)";
    line.style.transformOrigin = "top center";
    line.style.transform = `rotate(${i * 30}deg)`;
    radarBackground.appendChild(line);
  }

  const classDRadius = nmToPixels(CRQ.classDRadiusNM);
  const classDCircle = document.createElement("div");
  classDCircle.style.position = "absolute";
  classDCircle.style.left = centerX + "px";
  classDCircle.style.top = centerY + "px";
  classDCircle.style.width = (classDRadius * 2) + "px";
  classDCircle.style.height = (classDRadius * 2) + "px";
  classDCircle.style.border = "2px dashed blue";
  classDCircle.style.borderRadius = "50%";
  classDCircle.style.transform = "translate(-50%, -50%)";
  classDCircle.style.boxShadow = "0 0 10px rgba(0, 0, 255, 0.5)";
  radarBackground.appendChild(classDCircle);

  const label = document.createElement("div");
  label.style.position = "absolute";
  label.style.left = centerX + "px";
  label.style.top = centerY + "px";
  label.style.transform = "translate(-50%, -50%)";
  label.style.color = "blue";
  label.style.fontFamily = '"Courier New", monospace';
  label.style.fontSize = "14px";
  label.style.fontWeight = "bold";
  label.style.textShadow = "0 0 4px black";
  label.textContent = "";
  radarBackground.appendChild(label);

  const classDInfo = document.createElement("div");
  classDInfo.style.position = "absolute";
  classDInfo.style.left = centerX + "px";
  classDInfo.style.top = (centerY + classDRadius + 15) + "px";
  classDInfo.style.transform = "translate(-50%, 0)";
  classDInfo.style.color = "#6666ff";
  classDInfo.style.fontFamily = '"Courier New", monospace';
  classDInfo.style.fontSize = "10px";
  classDInfo.textContent = `CLASS D ${CRQ.classDRadiusNM}NM`;
  radarBackground.appendChild(classDInfo);
}

const dots = [];

function createRandomDots() {
  const numDots = 20;

  for (let i = 0; i < numDots; i++) {
    const dot = document.createElement("div");
    const size = Math.random() * 4 + 2;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const speed = Math.random() * 0.5 + 0.2;
    const angle = Math.random() * Math.PI * 2;

    dot.style.position = "absolute";
    dot.style.width = size + "px";
    dot.style.height = size + "px";
    dot.style.background = "lime";
    dot.style.borderRadius = "50%";
    dot.style.left = x + "px";
    dot.style.top = y + "px";
    dot.style.boxShadow = "0 0 6px lime";
    dot.style.opacity = "0.8";
    dot.style.zIndex = "1";

    radarBackground.appendChild(dot);

    dots.push({
      element: dot,
      x: x,
      y: y,
      size: size,
      speed: speed,
      angle: angle
    });
  }
}

function animateDots() {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  dots.forEach(dot => {
    dot.x += Math.cos(dot.angle) * dot.speed;
    dot.y += Math.sin(dot.angle) * dot.speed;

    if (dot.x < -10 || dot.x > window.innerWidth + 10 ||
        dot.y < -10 || dot.y > window.innerHeight + 10) {
      dot.x = Math.random() * window.innerWidth;
      dot.y = Math.random() * window.innerHeight;
      dot.angle = Math.random() * Math.PI * 2;
    }

    dot.element.style.left = dot.x + "px";
    dot.element.style.top = dot.y + "px";
  });

  requestAnimationFrame(animateDots);
}

const style = document.createElement("style");
style.textContent = `
  @keyframes pulse {
    0% { opacity: 0.3; transform: scale(0.8); }
    100% { opacity: 1; transform: scale(1.2); }
  }
`;
document.head.appendChild(style);

createRadarGrid();
createRandomDots();
animateDots();

window.addEventListener("resize", () => {
  radarBackground.innerHTML = "";
  dots.length = 0;
  createRadarGrid();
  createRandomDots();
})

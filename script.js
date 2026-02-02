const arena = document.getElementById("arena");
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const result = document.getElementById("result");

let yesScale = 1.0;

// повертає випадкову позицію в межах арени так, щоб кнопка не вилітала за рамки
function randomPositionWithinArena(button) {
  const a = arena.getBoundingClientRect();
  const b = button.getBoundingClientRect();

  const padding = 10;
  const maxX = a.width - b.width - padding;
  const maxY = a.height - b.height - padding;

  const x = Math.max(padding, Math.random() * Math.max(1, maxX));
  const y = Math.max(padding, Math.random() * Math.max(1, maxY));

  return { x, y };
}

function moveNoButton() {
  const { x, y } = randomPositionWithinArena(noBtn);
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  noBtn.style.transform = `translate(0, 0)`;
}

// “Ні” тікає, коли наводишся / пробуєш натиснути
noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("mousemove", (e) => {
  // легкий шанс втечі навіть при русі по кнопці
  if (Math.random() < 0.25) moveNoButton();
});
noBtn.addEventListener("mousedown", (e) => {
  e.preventDefault();
  moveNoButton();
});
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  moveNoButton();
});

// “Так” збільшується щоразу + показує результат
yesBtn.addEventListener("click", () => {
  yesScale += 0.07;
  yesBtn.style.transform = `scale(${yesScale})`;

  result.hidden = false;

  // трохи конфеті-псевдо: швидкий “пульс” арени
  arena.animate(
    [{ transform: "scale(1)" }, { transform: "scale(1.02)" }, { transform: "scale(1)" }],
    { duration: 320, easing: "ease-out" }
  );
});

// якщо змінюється розмір (телефон/вікно) — перерахуй позицію “Ні”
window.addEventListener("resize", () => {
  // поставимо “Ні” в безпечне місце
  moveNoButton();
});

// стартова позиція
moveNoButton();

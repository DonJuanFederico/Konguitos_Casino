window.anime = anime;

var currentBallRotation = 0;
var currentWheelRotation = 0;
var currentWheelIndex = 0;
var isRotating = false;
const rouletteWheelNumbers = [
  0,
  32,
  15,
  19,
  4,
  21,
  2,
  25,
  17,
  34,
  6,
  27,
  13,
  36,
  11,
  30,
  8,
  23,
  10,
  5,
  24,
  16,
  33,
  1,
  20,
  14,
  31,
  9,
  22,
  18,
  29,
  7,
  28,
  12,
  35,
  3,
  26
];

const getRouletteWheelNumber = index =>
  console.log("index", index) ||
  rouletteWheelNumbers[index >= 0 ? index % 37 : (37 - Math.abs(index % 37)) % 37];


const getRouletteWheelColor = index => {
  const i = index >= 0 ? index % 37 : 37 - Math.abs(index % 37);
  console.log("i", i);
  return i == 37 ? "green" : i % 2 == 0 ? "black" : "red";
};

window.rouletteWheelNumbers = rouletteWheelNumbers;

function addFlipper() {
  const mkDiv = className => {
    const d = document.createElement("div");
    d.classList.add(...className.split(" "));
    return d;
  };
  const flipper = mkDiv("flipper");
  const front = mkDiv("front-face");
  const back = mkDiv("back-face");
  flipper.appendChild(front);
  flipper.appendChild(back);
  document.querySelector(".result").appendChild(flipper);
  return (number, color) => {
    flipper.classList.add("flip", color);
    back.innerText = number;
  };
}

function startRotation(speed) {
  if (isRotating) {
    return;
  }

  isRotating = true;

  const writeResult = addFlipper();

  const bezier = [0.165, 0.84, 0.44, 1.005];
  const newWheelIndex = currentWheelIndex - speed;
  const result = getRouletteWheelNumber(newWheelIndex);
  const resultColor = getRouletteWheelColor(newWheelIndex);
  (() => {
    const newRotaion = currentWheelRotation + (360 / 37) * speed;
    console.log(getRouletteWheelNumber(currentWheelIndex), "---> ", result);
    var myAnimation = anime({
      targets: [".layer-2", ".layer-4"],
      rotate: function() {
        return newRotaion;
      },
      duration: function() {
        return 10000;
      },
      loop: 1,
      // easing: "cubicBezier(0.010, 0.990, 0.855, 1.010)",
      easing: `cubicBezier(${bezier.join(",")})`,
      // easing: "cubicBezier(0.000, 1.175, 0.980, 0.990)",
      complete: (...args) => {
        currentWheelRotation = newRotaion;
        currentWheelIndex = newWheelIndex;
      }
    });
  })();

  (() => {
    const newRotaion = -4 * 360 + currentBallRotation;
    console.log("newRotaion", newRotaion);
    var myAnimation1 = anime({
      targets: ".ball-container",
      translateY: [
        { value: 0, duration: 2000 },
        { value: 20, duration: 1000 },
        { value: 25, duration: 900 },
        { value: 50, duration: 1000 }
      ],
      rotate: [{ value: newRotaion, duration: 9000 }],
      duration: function() {
        return 7000; // anime.random(800, 1400);
      },
      loop: 1,
      easing: `cubicBezier(${bezier.join(",")})`,
      complete: () => {
        currentBallRotation = newRotaion;
        writeResult(result, resultColor);
        isRotating = false;
      }
    });
  })();
}
document.querySelector(".roulette-wheel").addEventListener(
  "touchmove",
  e => {
    e.preventDefault();
  },
  { passive: false }
);





/* ------------------------------------ APUESTAS ------------------------------------*/
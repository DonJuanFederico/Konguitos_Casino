class SafeObserver {
  constructor(destination) {
    this.destination = destination;
  }

  next(value) {
    // only try to next if you're subscribed have a handler
    if (!this.isUnsubscribed && this.destination.next) {
      try {
        this.destination.next(value);
      } catch (err) {
        // if the provided handler errors, teardown resources, then throw
        this.unsubscribe();
        throw err;
      }
    }
  }

  error(err) {
    // only try to emit error if you're subscribed and have a handler
    if (!this.isUnsubscribed && this.destination.error) {
      try {
        this.destination.error(err);
      } catch (e2) {
        // if the provided handler errors, teardown resources, then throw
        this.unsubscribe();
        throw e2;
      }
      this.unsubscribe();
    }
  }

  complete() {
    // only try to emit completion if you're subscribed and have a handler
    if (!this.isUnsubscribed && this.destination.complete) {
      try {
        this.destination.complete();
      } catch (err) {
        // if the provided handler errors, teardown resources, then throw
        this.unsubscribe();
        throw err;
      }
      this.unsubscribe();
    }
  }

  unsubscribe() {
    this.isUnsubscribed = true;
    if (this.unsub) {
      this.unsub();
    }
  }
}

class Observable {
  constructor(_subscribe) {
    this._subscribe = _subscribe;
  }

  subscribe(observer) {
    const safeObserver = new SafeObserver(observer);
    safeObserver.unsub = this._subscribe(safeObserver);
    return safeObserver.unsubscribe.bind(safeObserver);
  }
}

const map = project => source =>
  new Observable(observer =>
    source.subscribe({
      next: x => observer.next(project(x)),
      error: err => observer.error(err),
      complete: () => observer.complete()
    })
  );

const filter = f => source =>
  new Observable(observer =>
    source.subscribe({
      next: x => (f(x) ? observer.next(x) : void 8),
      error: err => observer.error(err),
      complete: () => observer.complete()
    })
  );

const take = limit => source =>
  new Observable(observer => {
    var i = 0;
    return source.subscribe({
      next: x => {
        i++;
        observer.next(x);
        if (i == limit) {
          observer.complete();
        }
      },
      error: err => observer.error(err),
      complete: () => observer.complete()
    });
  });

const act = f =>
  map(x => {
    f(x);
    return x;
  });

 const startWith = init => source =>
  new Observable(observer => {
    observer.next(init);
    return source.subscribe(observer);
  });

const scan = f => source =>
  new Observable(observer => {
    var last = null;
    var has_last = false;
    const mapObserver = {
      next: x => {
        last = has_last ? f(last, x) : x;
        has_last = true;
        return observer.next(last);
      },
      error: err => observer.error(err),
      complete: () => observer.complete()
    };
    return source.subscribe(mapObserver);
  });

const withLatestFrom = right => source =>
  new Observable(observer => {
    var right_val = null;
    const sourceObserver = {
      next: x => observer.next([x, right_val]),
      error: err => observer.error(err),
      complete: () => observer.complete()
    };
    const rightObserver = {
      next: x => {
        right_val = x;
      },
      error: err => observer.error(err),
      complete: () => observer.complete()
    };
    const source_unsub = source.subscribe(sourceObserver);
    const right_unsub = right.subscribe(rightObserver);
    const unsub = () => {
      source_unsub();
      right_unsub();
    };
    return unsub;
  });

const timer = (interval, limit = Infinity) =>
  new Observable(observer => {
    var i = 0;
    const t = setInterval(() => {
      observer.next(i++);
      if (i == limit) {
        observer.complete();
        clearInterval(t);
      }
    }, interval);
    return () => clearInterval(t);
  });

const fromEvent = (element, eventname) =>
  new Observable(observer => {
    const callback = e => observer.next(e);
    element.addEventListener(eventname, callback);
    return () => element.removeEventListener(eventname, callback);
  });

function pipe(initialValue, ...fns) {
  return fns.reduce((state, fn) => fn(state), initialValue);
}

const takeUntil = notifier => source =>
  new Observable(observer => {
    const source_unsub = source.subscribe({
      next: x => observer.next(x),
      error: err => observer.error(err),
      complete: () => observer.complete()
    });
    const notifier_unsub = notifier.subscribe({
      next: _x => {
        observer.complete();
      },
      error: err => observer.error(err),
      complete: () => observer.complete()
    });
    const unsub = () => {
      source_unsub();
      notifier_unsub();
    };
    return unsub;
  });

const zip = left => right =>
  new Observable(observer => {
    var left_queue = [];
    var right_queue = [];
    const leftObserver = {
      next: x => {
        left_queue.push(x);
        const r = right_queue.shift();
        if (typeof r != "undefined") {
          const l = left_queue.shift();
          observer.next([l, r]);
        }
      },
      error: err => observer.error(err),
      complete: () => observer.complete()
    };
    const rightObserver = {
      next: x => {
        right_queue.push(x);
        const l = left_queue.shift();
        if (typeof l != "undefined") {
          const r = right_queue.shift();
          observer.next([l, r]);
        }
      },
      error: err => observer.error(err),
      complete: () => observer.complete()
    };
    const left_unsub = left.subscribe(leftObserver);
    const right_unsub = right.subscribe(rightObserver);
    const unsub = () => {
      left_unsub();
      right_unsub();
    };
    return unsub;
  });


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
  rouletteWheelNumbers[index >= 0 ? index % 37 : 37 - Math.abs(index % 37)];

const getRouletteWheelColor = index => {
  const i = index >= 0 ? index % 37 : 37 - Math.abs(index % 37);
  return i == 0 ? "green" : i % 2 == 0 ? "black" : "red";
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
        return 5000;
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
      rotate: [{ value: newRotaion, duration: 4000 }],
      duration: function() {
        return 4000; // anime.random(800, 1400);
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

function offsetEl(el) {
  var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft,
    width: rect.width,
    height: rect.height
  };
}

function isInBoundaryEl(el, x, y) {
  const o = offsetEl(el);
  return (
    x >= o.left && x <= o.left + o.width && y >= o.top && y <= o.top + o.height
  );
}

function isInRadiusEl(el, x, y) {
  const o = offsetEl(el);
  const cx = o.left + o.width / 2;
  const cy = o.top + o.height / 2;
  const dx = x - cx;
  const dy = y - cy;
  const r = o.width / 2;
  return Math.pow(dx, 2) + Math.pow(dy, 2) <= Math.pow(r, 2);
}

const documentEvent = eventName =>
  pipe(
    fromEvent(document, eventName),
    map(e =>
      e.type == "touchstart" || e.type == "touchmove"
        ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
        : { x: e.clientX, y: e.clientY }
    )
  );

const tryRotate = ([p0, p1]) => {
  const w = document.querySelector(".layer-2.wheel");
  if (isInRadiusEl(w, p0.x, p0.y)) {
    const d = Math.round(
      Math.sqrt(Math.pow(p0.x - p1.x, 2) + Math.pow(p0.y - p1.y, 2)) / 4
    );
    if (Math.abs(d) > 3) {
      window.startRotation(d);
    }
  }
};

zip(documentEvent("mousedown"))(documentEvent("mouseup")).subscribe({
  next: tryRotate
});

zip(documentEvent("touchstart"))(
  pipe(
    withLatestFrom(documentEvent("touchmove"))(fromEvent(document, "touchend")),
    map(([_, r]) => r)
  )
).subscribe({
  next: tryRotate
});

pipe(
  withLatestFrom(documentEvent("touchmove"))(fromEvent(document, "touchend")),
  map(([_, r]) => r)
).subscribe({
  next: e => console.log(e)
});

document.querySelector(".roulette-wheel").addEventListener(
  "touchmove",
  e => {
    e.preventDefault();
  },
  { passive: false }
);

window.startRotation = startRotation;
var bontonAtras = document.querySelector('.back');
// funcion para ir a la ventana de atras
function volverAtras(){document.location.assign('http://127.0.0.1:5000/Juegos/')}
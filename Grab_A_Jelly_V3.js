/* =====================================================
   COCOLOCO COMPS | GRAB A JELLY V5
   Luxury emerald and gold edition

   Machine image: Grab_A_Jelly_Machine.png
   Claw image: Grabajelly-claw.png
   Individual bear: bear-grab.png

   No separate plushie-pile overlay.
   Test Rafflex results before enabling for customers.
===================================================== */

(function () {
"use strict";

const BASE = "https://geesmith.github.io/cocoloco-assets/";

const ASSETS = {
  machine: BASE + "Grab_A_Jelly_Machine.png",
  claw: BASE + "Grabajelly-claw.png",
  bear: BASE + "bear-grab.png"
};

const FLAG = "clGrabJellyV5";
const TITLE = /^🧸\s*Grab\s+A\s+Jelly\s*🧸?\s*$/i;

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[c]);
}

/* IDENTIFY CORRECT COMPETITION */

function correctTitle(widget) {
  let node = widget;

  while (node && node !== document.body) {
    const games = node.querySelectorAll(
      '[x-data^="potDropGame_"]'
    );

    if (games.length > 1) return false;

    const matches = Array.from(
      node.querySelectorAll("h1,h2,h3,h4")
    ).filter(el =>
      TITLE.test((el.textContent || "").trim())
    );

    if (matches.length === 1) return true;

    node = node.parentElement;
  }

  return false;
}

/* LUXURY EMERALD AND GOLD DESIGN */

function installStyles() {
  if (document.getElementById("clj5-css")) return;

  const style = document.createElement("style");

  style.id = "clj5-css";

  style.textContent = `

.clj5,
.clj5 * {
  box-sizing: border-box;
}

.clj5 {
  position: relative;
  isolation: isolate;
  width: 100%;
  padding: clamp(12px, 3vw, 24px);
  overflow: hidden;
  border: 4px ridge #f7d785;
  border-radius: 27px;
  color: #fff;
  text-align: center;
  font-family: Montserrat, Arial, sans-serif;

  background:
    radial-gradient(
      ellipse at 12% 5%,
      #f4d27c75,
      transparent 32%
    ),
    radial-gradient(
      ellipse at 90% 82%,
      #dbb35b70,
      transparent 37%
    ),
    radial-gradient(
      ellipse at 48% 44%,
      #17805a,
      transparent 75%
    ),
    linear-gradient(
      140deg,
      #001d16 0%,
      #07533c 23%,
      #003629 51%,
      #096247 76%,
      #001c16 100%
    );

  box-shadow:
    inset 0 0 0 2px #fff0b1,
    inset 0 0 0 7px #966618,
    inset 0 0 44px #00150d,
    0 12px 32px #0008;
}

.clj5::before {
  content: "";
  position: absolute;
  inset: 10px;
  border: 1px solid #ffe29b99;
  border-radius: 19px;
  pointer-events: none;
}

.clj5::after {
  content: "✦      ✧      ✦      ✧      ✦";
  position: absolute;
  top: 15px;
  left: 0;
  width: 100%;
  color: #ffebaf;
  font-size: 12px;
  letter-spacing: 5px;
  opacity: .7;
  pointer-events: none;
  animation: clj5Shimmer 3s ease-in-out infinite alternate;
}

.clj5 > * {
  position: relative;
  z-index: 1;
}

.clj5-brand {
  margin: 23px 0 5px;
  color: #ffedaf;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 3px;
  text-shadow: 0 2px 5px #000;
}

.clj5-title {
  margin: 7px 0;
  font: 900 clamp(25px, 6vw, 39px) Georgia, serif;
  color: #ffe19a;

  text-shadow:
    0 1px 0 #fff5cc,
    0 3px 0 #82500e,
    0 5px 8px #000,
    0 0 17px #ffcf6766;
}

.clj5-count {
  margin-bottom: 15px;
  color: #ffedbf;
  font-size: 13px;
}

/* NEW MACHINE IMAGE */

.clj5-machine {
  position: relative;
  isolation: isolate;
  width: 100%;
  max-width: 560px;
  margin: 0 auto;
  aspect-ratio: 1;
  overflow: hidden;
  border: 2px solid #ffe4a0;
  border-radius: 17px;

  background:
    linear-gradient(135deg, #09543d, #002c21);

  box-shadow:
    0 0 0 3px #946116,
    0 0 0 5px #f4d17c,
    0 10px 28px #0009,
    0 0 30px #e8bc5738;
}

.clj5-background {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: fill;
  pointer-events: none;
  user-select: none;
}

/* CLAW AREA */

/*
  The plushies are already inside the machine image.
  There is NO separate pile image.
*/

.clj5-glass {
  position: absolute;
  left: 15%;
  top: 23%;
  width: 70%;
  height: 53%;
  overflow: hidden;
  z-index: 2;
  pointer-events: none;
}

.clj5-carriage {
  position: absolute;
  z-index: 8;
  left: 50%;
  top: -5%;
  width: 27%;
  height: 38%;
  transform: translateX(-50%);

  transition:
    left .22s ease,
    top 1.2s cubic-bezier(.4, 0, .3, 1);
}

.clj5-claw {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;

  filter:
    drop-shadow(0 4px 7px #000a)
    drop-shadow(0 0 4px #ffda7755);

  transform-origin: 50% 60%;
  transition: transform .35s ease;
}

.clj5.grabbing .clj5-claw {
  transform: scaleX(.76);
}

/* INDIVIDUAL BARTHOLOMEW BEAR */

.clj5-held {
  position: absolute;
  z-index: 7;
  left: 50%;
  top: 69%;
  width: 80%;
  height: 48%;
  object-fit: contain;

  transform:
    translateX(-50%)
    scale(.65);

  opacity: 0;
  pointer-events: none;

  filter:
    drop-shadow(0 6px 5px #0009);

  transition:
    opacity .2s,
    top 1.2s ease,
    transform .75s ease;
}

.clj5.held .clj5-held {
  opacity: 1;

  transform:
    translateX(-50%)
    scale(1);
}

.clj5.dropped .clj5-held {
  top: 195%;
  opacity: 0;

  transform:
    translateX(-50%)
    rotate(65deg)
    scale(.8);

  transition:
    top .75s ease-in,
    opacity .75s,
    transform .75s ease-in;
}

/* WIN ANNOUNCEMENT */

.clj5-prize {
  display: none;
  position: absolute;
  z-index: 20;
  top: 28%;
  left: 8%;
  width: 84%;
  padding: 17px 10px;
  border: 3px solid #ffe08a;
  border-radius: 17px;

  background:
    radial-gradient(
      ellipse at 50% 0%,
      #218e66,
      transparent 80%
    ),
    linear-gradient(
      135deg,
      #07583df5,
      #01261df5
    );

  color: #ffecad;
  font-size: clamp(15px, 4vw, 24px);
  font-weight: 900;
  overflow-wrap: anywhere;

  box-shadow:
    0 0 35px #ffcf61,
    inset 0 0 20px #e8bd4833;

  animation: clj5Pop .5s ease both;
}

.clj5.win .clj5-machine::after {
  content: "✦ ✧ ✨ ✦ ✧ ✨ ✦";
  position: absolute;
  z-index: 19;
  top: 16%;
  left: 0;
  width: 100%;
  color: #ffe88c;
  font-size: clamp(15px, 4vw, 27px);
  pointer-events: none;
  animation: clj5Shimmer .35s alternate infinite;
}

/* MESSAGE */

.clj5-message {
  margin: 17px 0;
  min-height: 26px;
  color: #ffebac;
  font-size: 13px;
  font-weight: 900;
  text-shadow: 0 2px 5px #000;
}

/* LUXURY ARCADE BUTTONS */

.clj5-controls {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  padding: 5px 0 9px;
}

.clj5 button {
  min-height: 47px;
  padding: 12px 14px;
  border: 2px solid #f8d981;
  border-radius: 13px;
  color: white;

  background:
    linear-gradient(
      160deg,
      #55c49a,
      #147454 28%,
      #043c2d 59%,
      #0e614b
    );

  font: 900 13px Montserrat, Arial, sans-serif;
  text-shadow: 0 1px 2px #000;
  cursor: pointer;
  touch-action: manipulation;

  box-shadow:
    inset 0 2px 2px #ffffff70,
    inset 0 -4px 3px #001c16,
    0 5px 0 #78531b,
    0 8px 13px #0008;
}

.clj5 button:active:not(:disabled) {
  transform: translateY(3px);

  box-shadow:
    inset 0 2px 3px #0008,
    0 2px 0 #78531b;
}

.clj5 button:disabled {
  opacity: .45;
  cursor: default;
}

.clj5 [data-grab] {
  border-color: #fff0b0;
  color: #123c2c;
  text-shadow: none;

  background:
    linear-gradient(
      160deg,
      #fff8ce,
      #ffe18a 31%,
      #c58d29 62%,
      #ffe18a
    );

  box-shadow:
    inset 0 2px 3px #ffffffbb,
    inset 0 -3px 3px #8b541b,
    0 5px 0 #78531b,
    0 7px 15px #0008,
    0 0 14px #ffda6440;
}

/* RESULTS */

.clj5-result,
.clj5-summary {
  display: none;
  margin-top: 15px;
  padding: 17px;
  border: 2px solid #e8c56a;
  border-radius: 15px;

  background:
    radial-gradient(
      ellipse at 50% 0%,
      #146b4a,
      transparent 85%
    ),
    linear-gradient(
      145deg,
      #064332ed,
      #011e17ed
    );

  box-shadow:
    inset 0 0 18px #e9c45b20,
    0 5px 13px #0004;

  overflow-wrap: anywhere;
}

.clj5-result strong {
  display: block;
  margin: 7px 0;
  color: #ffe39a;
  font-size: 20px;
}

.clj5-summary h3 {
  color: #ffdf85;
}

.clj5-summary-row {
  margin: 6px 0;
  padding: 10px;
  border: 1px solid #e7c36a44;
  border-radius: 9px;
  background: #ffffff12;
  overflow-wrap: anywhere;
}

@keyframes clj5Pop {
  from {
    opacity: 0;
    transform: scale(.65);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes clj5Shimmer {
  from {
    opacity: .35;
    filter: brightness(.8);
  }

  to {
    opacity: 1;
    filter: brightness(1.5);
  }
}

@media (max-width: 500px) {
  .clj5 {
    padding: 10px;
  }

  .clj5-controls button {
    font-size: 11px;
    padding: 10px;
  }

  .clj5-brand {
    letter-spacing: 2px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .clj5 * {
    transition-duration: .01ms !important;
    animation-duration: .01ms !important;
  }
}

`;

  document.head.appendChild(style);
}

/* INITIALISE GAME */

function scan() {

  document.querySelectorAll(
    '[x-data^="potDropGame_"]'
  ).forEach(widget => {

    if (widget.dataset[FLAG]) return;

    if (!correctTitle(widget)) return;

    if (!window.Alpine?.$data) return;

    /* DO NOT RUN WITH OLDER VERSIONS */

    if (
      widget.dataset.clGrabJellyV1 ||
      widget.dataset.clGrabJellyV2 ||
      widget.dataset.clGrabJellyV3 ||
      widget.dataset.clGrabJellyV4
    ) {
      console.warn(
        "🧸 Disable previous Grab A Jelly versions first."
      );

      return;
    }

    let game;

    try {
      game = window.Alpine.$data(widget);
    } catch (e) {
      return;
    }

    if (
      !game ||
      !Array.isArray(game.pots) ||
      !game.pots.length ||
      typeof game.completeGame !== "function"
    ) {
      return;
    }

    const id = (
      widget.getAttribute("x-data") || ""
    ).split("_").pop();

    const arena =
      document.getElementById("pot-container_" + id) ||
      widget.querySelector('[id^="pot-container_"]');

    if (!arena) return;

    widget.dataset[FLAG] = "1";

    installStyles();

    const pots = game.pots.slice();

    let index = 0;
    let busy = false;
    let finished = false;
    let muted = false;
    let position = 50;

    const wins = [];
    const processed = new Set();
    let timers = [];

    function later(fn, ms) {
      const timer = setTimeout(fn, ms);
      timers.push(timer);
      return timer;
    }

    function clearTimers() {
      timers.forEach(clearTimeout);
      timers = [];
    }

    /* HIDE ORIGINAL POT DROP DISPLAY */

    widget.querySelectorAll("button").forEach(btn => {

      if (
        (btn.textContent || "").trim() !== "Start Game"
      ) {
        return;
      }

      let parent = btn.parentElement;

      while (parent && parent !== widget) {

        if (
          parent.textContent.includes("Pot Drop Game") &&
          parent.textContent.includes("Drop Speed")
        ) {
          parent.style.display = "none";
          break;
        }

        parent = parent.parentElement;
      }

    });

    [...arena.children].forEach(el => {
      el.style.display = "none";
    });

    Object.assign(arena.style, {
      height: "auto",
      minHeight: "0",
      overflow: "visible",
      opacity: "1",
      filter: "none",
      pointerEvents: "auto"
    });

    /* BUILD INTERFACE */

    const app = document.createElement("div");

    app.className = "clj5";

    app.innerHTML = `

<div class="clj5-brand">
  ✦ COCOLOCO COMPS ✦
</div>

<h2 class="clj5-title">
  🧸 GRAB A JELLY 🧸
</h2>

<div class="clj5-count" data-count></div>

<div class="clj5-machine">

  <img
    class="clj5-background"
    src="${ASSETS.machine}"
    alt="CocoLoco Grab A Jelly machine"
    draggable="false"
  >

  <div class="clj5-glass">

    <div class="clj5-carriage" data-carriage>

      <img
        class="clj5-claw"
        src="${ASSETS.claw}"
        alt=""
        draggable="false"
      >

      <img
        class="clj5-held"
        src="${ASSETS.bear}"
        alt=""
        data-held
        draggable="false"
      >

    </div>

  </div>

  <div
    class="clj5-prize"
    data-prize
    aria-live="polite"
  ></div>

</div>

<div
  class="clj5-message"
  data-msg
  aria-live="polite"
>
  Move your claw and press GRAB!
</div>

<div class="clj5-controls">

  <button type="button" data-left>
    ◀ LEFT
  </button>

  <button type="button" data-grab>
    🕹️ GRAB!
  </button>

  <button type="button" data-right>
    RIGHT ▶
  </button>

  <button
    type="button"
    data-mute
    aria-pressed="false"
  >
    🔊 Sound on
  </button>

  <button type="button" data-skip>
    ⏭ Skip All
  </button>

</div>

<div
  class="clj5-result"
  data-result
  aria-live="polite"
></div>

<div class="clj5-summary" data-summary>

  <h3>🧸 Your Grab A Jelly Results</h3>

  <div data-list></div>

</div>

`;

    arena.appendChild(app);

    const $ = selector => app.querySelector(selector);

    const carriage = $("[data-carriage]");
    const msg = $("[data-msg]");
    const prizeEl = $("[data-prize]");
    const result = $("[data-result]");
    const machineImage = $(".clj5-background");

    /* IMAGE ERROR HANDLING */

    machineImage.addEventListener("error", () => {
      console.error(
        "🧸 Machine image failed:",
        machineImage.src
      );

      msg.textContent =
        "Machine image couldn't load. Please refresh.";
    });

    /* SOUND */

    let audio = null;

    function context() {
      const Audio =
        window.AudioContext ||
        window.webkitAudioContext;

      if (!Audio) return null;

      if (!audio) {
        audio = new Audio();
      }

      if (audio.state === "suspended") {
        audio.resume().catch(() => {});
      }

      return audio;
    }

    function tone(
      ctx,
      start,
      freq,
      end,
      duration,
      type = "sine",
      volume = .07
    ) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;

      osc.frequency.setValueAtTime(
        Math.max(1, freq),
        start
      );

      osc.frequency.exponentialRampToValueAtTime(
        Math.max(1, end),
        start + duration
      );

      gain.gain.setValueAtTime(.0001, start);

      gain.gain.exponentialRampToValueAtTime(
        volume,
        start + .012
      );

      gain.gain.exponentialRampToValueAtTime(
        .0001,
        start + duration
      );

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(start);
      osc.stop(start + duration + .01);
    }

    function noise(
      ctx,
      start,
      duration,
      volume = .06
    ) {
      const length = Math.ceil(
        ctx.sampleRate * duration
      );

      const buffer = ctx.createBuffer(
        1,
        length,
        ctx.sampleRate
      );

      const data = buffer.getChannelData(0);

      for (let i = 0; i < length; i++) {
        data[i] =
          (Math.random() * 2 - 1) *
          (1 - i / length);
      }

      const source = ctx.createBufferSource();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      source.buffer = buffer;

      filter.type = "lowpass";
      filter.frequency.value = 850;

      gain.gain.setValueAtTime(volume, start);

      gain.gain.exponentialRampToValueAtTime(
        .0001,
        start + duration
      );

      source.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      source.start(start);
      source.stop(start + duration);
    }

    function sound(kind) {
      if (muted) return;

      try {
        const ctx = context();
        if (!ctx) return;

        const t = ctx.currentTime + .015;

        if (kind === "move") {
          tone(ctx, t, 180, 265, .15, "sawtooth", .027);
          tone(ctx, t + .09, 220, 160, .15, "triangle", .035);
        }

        else if (kind === "lower") {
          tone(ctx, t, 135, 85, .8, "sawtooth", .032);
          tone(ctx, t, 250, 165, .8, "triangle", .025);
          noise(ctx, t, .55, .022);
        }

        else if (kind === "grab") {
          noise(ctx, t, .13, .13);
          tone(ctx, t, 135, 65, .2, "square", .065);
          tone(ctx, t + .13, 420, 260, .15, "triangle", .055);
        }

        else if (kind === "lift") {
          tone(ctx, t, 100, 240, .85, "sawtooth", .027);
          tone(ctx, t, 180, 350, .85, "triangle", .028);
        }

        else if (kind === "lose") {
          tone(ctx, t, 420, 170, .38, "triangle", .07);
          noise(ctx, t + .2, .22, .075);
          tone(ctx, t + .34, 220, 115, .36, "sine", .06);
        }

        else if (kind === "win") {
          [
            523.25,
            659.25,
            783.99,
            1046.5,
            1318.5
          ].forEach((freq, i) => {

            tone(
              ctx,
              t + i * .115,
              freq,
              freq * 1.015,
              .35,
              "triangle",
              .085
            );

            tone(
              ctx,
              t + i * .115,
              freq / 2,
              freq / 2,
              .31,
              "sine",
              .025
            );

          });

          tone(ctx, t + .58, 523, 1046, .52, "sine", .055);
        }

      } catch (e) {
        console.warn("🧸 Sound unavailable", e);
      }
    }

    /* BUTTON STATE */

    function buttons(disabled) {
      [
        "[data-left]",
        "[data-right]",
        "[data-grab]"
      ].forEach(selector => {
        $(selector).disabled = disabled;
      });
    }

    /* COUNTER */

    function updateCount() {
      const remaining = Math.max(
        0,
        pots.length - index
      );

      $("[data-count]").textContent =
        remaining +
        " ticket" +
        (remaining === 1 ? "" : "s") +
        " remaining";
    }

    /* REGISTER RAFFLEX RESULT */

    function register(p) {
      if (processed.has(index)) return;

      processed.add(index);

      const won = !!p.won;

      if (won) {
        wins.push({
          ticket: p.ticket ?? "?",
          prize: String(p.prize || "Prize")
        });
      }

      game.currentIndex = Math.min(
        pots.length,
        Number(game.currentIndex || 0) + 1
      );

      game.processedPots =
        Number(game.processedPots || 0) + 1;

      if (won) {
        game.revealedWins =
          Number(game.revealedWins || 0) + 1;
      }
    }

    /* RESET */

    function reset() {
      app.classList.remove(
        "grabbing",
        "held",
        "dropped",
        "win"
      );

      carriage.style.top = "-5%";

      prizeEl.style.display = "none";
      prizeEl.textContent = "";

      result.style.display = "none";
      result.innerHTML = "";
    }

    /* COMPLETE */

    function finish() {
      if (finished) return;

      finished = true;
      busy = false;

      clearTimers();
      buttons(true);

      $("[data-skip]").disabled = true;

      msg.textContent = "🧸 All tickets revealed!";

      $("[data-list]").innerHTML = wins.length ?

        wins.map(w => `

<div class="clj5-summary-row">
  Ticket #${esc(w.ticket)} • ${esc(w.prize)}
</div>

`).join("") :

        `

<div class="clj5-summary-row">
  No instant wins this time.
</div>

`;

      $("[data-summary]").style.display = "block";

      try {
        if (Array.isArray(game.activePots)) {
          game.activePots.length = 0;
        }

        game.currentIndex = pots.length;
        game.processedPots = pots.length;

        setTimeout(() => {
          try {
            game.completeGame();

            console.log(
              "🧸 Grab A Jelly V5 completed"
            );

          } catch (e) {
            console.error(
              "🧸 Completion error",
              e
            );
          }
        }, 150);

      } catch (e) {
        console.error(
          "🧸 Game state error",
          e
        );
      }
    }

    /* GRAB AN INDIVIDUAL BEAR */

    function grab() {
      if (
        finished ||
        busy ||
        index >= pots.length
      ) return;

      const p = pots[index];

      if (!p) return;

      busy = true;

      buttons(true);
      reset();

      sound("lower");

      msg.textContent =
        "🕹️ Lowering the claw...";

      requestAnimationFrame(() => {
        carriage.style.top = "35%";
      });

      later(() => {
        if (finished) return;

        app.classList.add("grabbing");

        msg.textContent =
          "🧸 GRABBING A JELLY!";

        app.classList.add("held");

        sound("grab");

        later(() => {
          if (finished) return;

          msg.textContent =
            "✨ Lifting your Jelly...";

          carriage.style.top = "-5%";

          sound("lift");

          later(() => {
            if (finished) return;

            const won = !!p.won;
            const ticket = p.ticket ?? "?";
            const prize = String(
              p.prize || "Prize"
            );

            if (won) {
              sound("win");

              app.classList.add("win");

              msg.textContent =
                "🎉 YOU GRABBED A WIN!";

              prizeEl.textContent =
                "✨ " + prize + " ✨";

              prizeEl.style.display = "block";

              result.innerHTML = `

<strong>🧸 WINNER!</strong>

Ticket #${esc(ticket)}

<strong>${esc(prize)}</strong>

`;

            } else {
              sound("lose");

              msg.textContent =
                "💚 Your Jelly slipped!";

              app.classList.add("dropped");

              result.innerHTML = `

<strong>No instant win this time</strong>

Ticket #${esc(ticket)}

<br>

<small>
  Check the competition terms for
  main-draw eligibility.
</small>

`;
            }

            result.style.display = "block";

            register(p);

            index++;

            updateCount();

            busy = false;

            if (index >= pots.length) {
              later(finish, 1900);

            } else {
              later(() => {
                if (finished) return;

                reset();
                buttons(false);

                msg.textContent =
                  "Move the claw and GRAB again!";

              }, won ? 1800 : 1200);
            }

          }, 1250);

        }, 450);

      }, 1200);
    }

    /* MOVE CLAW */

    function move(delta) {
      if (busy || finished) return;

      position = Math.max(
        12,
        Math.min(88, position + delta)
      );

      carriage.style.left = position + "%";

      sound("move");
    }

    /* EVENTS */

    $("[data-left]").addEventListener(
      "click",
      () => move(-10)
    );

    $("[data-right]").addEventListener(
      "click",
      () => move(10)
    );

    $("[data-grab]").addEventListener(
      "click",
      grab
    );

    $("[data-mute]").addEventListener(
      "click",
      () => {
        muted = !muted;

        $("[data-mute]").textContent =
          muted ?
          "🔇 Sound off" :
          "🔊 Sound on";

        $("[data-mute]").setAttribute(
          "aria-pressed",
          String(muted)
        );
      }
    );

    /* SKIP ALL */

    $("[data-skip]").addEventListener(
      "click",
      () => {
        if (finished) return;

        clearTimers();

        while (index < pots.length) {
          register(pots[index]);
          index++;
        }

        updateCount();

        finish();
      }
    );

    updateCount();

    console.log(
      "🧸 Grab A Jelly V5 loaded",
      pots.length,
      "tickets"
    );

  });
}

/* BOOT */

function boot() {
  scan();

  [400, 1000, 2000, 3500].forEach(
    delay => setTimeout(scan, delay)
  );

  let timer;

  new MutationObserver(() => {
    clearTimeout(timer);

    timer = setTimeout(scan, 120);

  }).observe(document.body, {
    childList: true,
    subtree: true
  });
}

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    boot
  );

} else {
  boot();
}

document.addEventListener(
  "livewire:navigated",
  scan
);

})();

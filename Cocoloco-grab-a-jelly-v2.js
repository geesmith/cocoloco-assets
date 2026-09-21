/* COCOLOCO GRAB A JELLY V2
   Separate Pot Drop reveal
   Marker: 🧸
   Test before enabling for customers.
*/

(function () {
"use strict";

const CONFIG = {
  marker: "🧸",
  flag: "clGrabJellyV2",
  base: "https://geesmith.github.io/cocoloco-assets/",
  machine: "Grabajelly-machine.png",
  claw: "Grabajelly-claw.png",
  plushies: "Grab_A_Jelly_Plushies.png"
};

const URLS = {
  machine: CONFIG.base + CONFIG.machine,
  claw: CONFIG.base + CONFIG.claw,
  plushies: CONFIG.base + CONFIG.plushies
};

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

/* FIND THE CORRECT COMPETITION */

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

/* STYLES */

function installStyles() {

  if (document.getElementById("clGrabJellyV2CSS")) return;

  const style = document.createElement("style");

  style.id = "clGrabJellyV2CSS";

  style.textContent = `

.clj2 {
  position:relative;
  width:100%;
  padding:12px;
  box-sizing:border-box;
  border-radius:22px;
  border:2px solid #d9b65f;
  background:linear-gradient(145deg,#064d3b,#011c17);
  color:white;
  font-family:Montserrat,Arial,sans-serif;
  text-align:center;
  overflow:hidden;
}

.clj2 * {
  box-sizing:border-box;
}

.clj2-brand {
  color:#ffe3a0;
  font-size:11px;
  font-weight:900;
  letter-spacing:3px;
}

.clj2-title {
  font:900 clamp(24px,6vw,38px) Georgia,serif;
  color:#ffe4a1;
  margin:9px 0;
}

.clj2-count {
  font-size:13px;
  color:#e7d49b;
  margin-bottom:10px;
}

/* MACHINE */

.clj2-machine {
  position:relative;
  width:100%;
  max-width:560px;
  margin:auto;
  aspect-ratio:1/1;
  overflow:hidden;
  isolation:isolate;
  border-radius:16px;
  background:#073d30;
}

.clj2-background {
  position:absolute;
  inset:0;
  width:100%;
  height:100%;
  object-fit:fill;
  pointer-events:none;
  user-select:none;
}

/* GLASS PLAY AREA */

.clj2-glass {
  position:absolute;
  left:15%;
  top:23%;
  width:70%;
  height:53%;
  overflow:hidden;
  z-index:2;
  pointer-events:none;
}

/* PILE OF REAL PLUSHIES */

.clj2-pile {
  position:absolute;
  bottom:-2%;
  left:-5%;
  width:110%;
  height:56%;
  object-fit:contain;
  object-position:bottom;
  filter:drop-shadow(0 6px 7px #0008);
  pointer-events:none;
}

/* MOVING CLAW */

.clj2-carriage {
  position:absolute;
  z-index:8;
  left:50%;
  top:-5%;
  width:27%;
  height:38%;
  transform:translateX(-50%);
  transition:
    left .18s ease,
    top 1.1s ease-in-out;
  pointer-events:none;
}

.clj2-claw {
  display:block;
  width:100%;
  height:100%;
  object-fit:contain;
  filter:drop-shadow(0 5px 6px #0009);
  transform-origin:50% 60%;
  transition:transform .3s ease;
}

.clj2.grabbing .clj2-claw {
  transform:scaleX(.78);
}

/* HELD PLUSHIE */

.clj2-held {
  position:absolute;
  z-index:7;
  left:50%;
  top:69%;
  width:58%;
  aspect-ratio:1;
  transform:translateX(-50%) scale(.8);
  opacity:0;
  overflow:hidden;
  border-radius:50%;
  background-image:var(--plush-image);
  background-size:340% auto;
  background-repeat:no-repeat;
  background-position:var(--plush-position,50% 70%);
  filter:drop-shadow(0 6px 5px #0008);
  transition:
    opacity .2s,
    top 1.1s ease,
    transform .65s ease;
}

.clj2.held .clj2-held {
  opacity:1;
}

.clj2.dropped .clj2-held {
  top:195%;
  opacity:0;
  transform:translateX(-50%) rotate(65deg);
  transition:
    top .75s ease-in,
    opacity .75s,
    transform .75s ease-in;
}

/* PRIZE OVERLAY */

.clj2-prize {
  display:none;
  position:absolute;
  z-index:20;
  top:28%;
  left:8%;
  width:84%;
  padding:14px 8px;
  border-radius:15px;
  border:2px solid #ffe3a0;
  background:#03412ff2;
  color:#ffe6a0;
  font-size:clamp(15px,4vw,24px);
  font-weight:900;
  overflow-wrap:anywhere;
  box-shadow:0 0 30px #ffdc70;
  animation:clj2Pop .45s ease both;
}

@keyframes clj2Pop {
  from {
    opacity:0;
    transform:scale(.65);
  }
  to {
    opacity:1;
    transform:scale(1);
  }
}

/* MESSAGE */

.clj2-message {
  margin:12px 0;
  min-height:25px;
  font-size:13px;
  font-weight:900;
  color:#ffe2a0;
}

/* CONTROLS */

.clj2-controls {
  display:flex;
  flex-wrap:wrap;
  justify-content:center;
  gap:8px;
}

.clj2 button {
  border:2px solid #d9b65f;
  border-radius:12px;
  background:linear-gradient(#237c60,#064330);
  color:white;
  font:900 13px Montserrat,Arial,sans-serif;
  padding:12px;
  min-height:46px;
  cursor:pointer;
  touch-action:manipulation;
}

.clj2 button:disabled {
  opacity:.4;
  cursor:default;
}

.clj2 [data-grab] {
  background:linear-gradient(#ffe39a,#bb8d30);
  color:#123e2d;
}

/* RESULT */

.clj2-result {
  display:none;
  margin-top:12px;
  padding:15px;
  border-radius:14px;
  border:1px solid #d9b65f;
  background:#ffffff12;
  overflow-wrap:anywhere;
}

.clj2-result strong {
  display:block;
  margin:6px 0;
  color:#ffe39a;
  font-size:20px;
}

.clj2-summary {
  display:none;
  margin-top:14px;
  padding:14px;
  border-radius:14px;
  border:1px solid #d9b65f;
  background:#01291f;
}

.clj2-summary-row {
  padding:9px;
  margin:6px 0;
  border-radius:8px;
  background:#ffffff12;
  overflow-wrap:anywhere;
}

@media(max-width:500px) {
  .clj2 {
    padding:7px;
  }

  .clj2-controls button {
    font-size:11px;
    padding:10px;
  }
}

@media(prefers-reduced-motion:reduce) {
  .clj2 * {
    transition-duration:.01ms!important;
    animation-duration:.01ms!important;
  }
}

`;

  document.head.appendChild(style);
}

/* FIND GAME */

function scan() {

  document.querySelectorAll(
    '[x-data^="potDropGame_"]'
  ).forEach(widget => {

    if (widget.dataset[CONFIG.flag]) return;

    if (!correctTitle(widget)) return;

    if (!window.Alpine?.$data) return;

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
    ) return;

    const id = (
      widget.getAttribute("x-data") || ""
    ).split("_").pop();

    const arena =
      document.getElementById("pot-container_" + id) ||
      widget.querySelector('[id^="pot-container_"]');

    if (!arena) return;

    /* PREVENT V1 AND V2 RUNNING TOGETHER */

    if (widget.dataset.clGrabJellyV1) {
      console.warn("🧸 V1 already loaded. Disable V1 before testing V2.");
      return;
    }

    widget.dataset[CONFIG.flag] = "1";

    installStyles();

    const pots = game.pots.slice();

    let index = 0;
    let busy = false;
    let finished = false;
    let muted = false;
    let position = 50;
    let wins = [];
    let timers = [];
    let processed = new Set();

    function later(fn, ms) {
      const timer = setTimeout(fn, ms);
      timers.push(timer);
      return timer;
    }

    function clearTimers() {
      timers.forEach(clearTimeout);
      timers = [];
    }

    /* HIDE NATIVE GAME */

    widget.querySelectorAll("button").forEach(btn => {

      if ((btn.textContent || "").trim() !== "Start Game") {
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

    /* BUILD MACHINE */

    const app = document.createElement("div");

    app.className = "clj2";

    app.innerHTML = `

<div class="clj2-brand">
✦ COCOLOCO COMPS ✦
</div>

<h2 class="clj2-title">
🧸 GRAB A JELLY 🧸
</h2>

<div class="clj2-count" data-count></div>

<div class="clj2-machine">

  <img
    class="clj2-background"
    src="${URLS.machine}"
    alt="CocoLoco claw machine"
    draggable="false"
  >

  <div class="clj2-glass">

    <img
      class="clj2-pile"
      src="${URLS.plushies}"
      alt=""
      draggable="false"
    >

    <div class="clj2-carriage" data-carriage>

      <img
        class="clj2-claw"
        src="${URLS.claw}"
        alt=""
        draggable="false"
      >

      <div
        class="clj2-held"
        data-held
      ></div>

    </div>

  </div>

  <div
    class="clj2-prize"
    data-prize
    aria-live="polite"
  ></div>

</div>

<div
  class="clj2-message"
  data-msg
  aria-live="polite"
>
Move your claw and press GRAB!
</div>

<div class="clj2-controls">

  <button type="button" data-left>
    ◀ LEFT
  </button>

  <button type="button" data-grab>
    🕹️ GRAB!
  </button>

  <button type="button" data-right>
    RIGHT ▶
  </button>

  <button type="button" data-mute aria-pressed="false">
    🔊 Sound on
  </button>

  <button type="button" data-skip>
    ⏭ Skip All
  </button>

</div>

<div
  class="clj2-result"
  data-result
  aria-live="polite"
></div>

<div class="clj2-summary" data-summary>

  <h3>🧸 Your Grab A Jelly Results</h3>

  <div data-list></div>

</div>

`;

    arena.appendChild(app);

    const $ = selector => app.querySelector(selector);

    const carriage = $("[data-carriage]");
    const held = $("[data-held]");
    const msg = $("[data-msg]");
    const prizeEl = $("[data-prize]");
    const result = $("[data-result]");

    held.style.setProperty(
      "--plush-image",
      `url("${URLS.plushies}")`
    );

    /* SOUND */

    function sound(type) {

      if (muted) return;

      try {

        const Audio =
          window.AudioContext ||
          window.webkitAudioContext;

        if (!Audio) return;

        const ctx =
          window.__clJellyAudio ||
          (window.__clJellyAudio = new Audio());

        if (ctx.state === "suspended") {
          ctx.resume();
        }

        const notes =
          type === "win" ? [523,659,784,1046] :
          type === "lose" ? [330,220] :
          type === "grab" ? [400,500] :
          [280];

        notes.forEach((freq, i) => {

          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          const t = ctx.currentTime + i * .11;

          osc.type = "triangle";

          osc.frequency.setValueAtTime(freq, t);

          gain.gain.setValueAtTime(.0001, t);

          gain.gain.exponentialRampToValueAtTime(
            .055,
            t + .015
          );

          gain.gain.exponentialRampToValueAtTime(
            .0001,
            t + .16
          );

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(t);
          osc.stop(t + .18);

        });

      } catch (e) {
        console.warn("Jelly sound unavailable", e);
      }
    }

    /* BUTTONS */

    function buttons(disabled) {

      ["[data-left]","[data-right]","[data-grab]"]
        .forEach(selector => {

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
        remaining + " ticket" +
        (remaining === 1 ? "" : "s") +
        " remaining";
    }

    /* REGISTER REAL RESULT */

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

    /* RESET ANIMATION */

    function reset() {

      app.classList.remove(
        "grabbing",
        "held",
        "dropped"
      );

      carriage.style.top = "-5%";

      held.style.setProperty(
        "--plush-position",
        "50% 70%"
      );

      prizeEl.style.display = "none";
      prizeEl.textContent = "";

      result.style.display = "none";
      result.innerHTML = "";
    }

    /* FINISH GAME */

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

<div class="clj2-summary-row">
Ticket #${esc(w.ticket)} • ${esc(w.prize)}
</div>

`).join("") :

        `<div class="clj2-summary-row">
No instant wins this time.
</div>`;

      $("[data-summary]").style.display = "block";

      try {

        if (Array.isArray(game.activePots)) {
          game.activePots.length = 0;
        }

        game.currentIndex = pots.length;
        game.processedPots = pots.length;

        /* Complete after the visual summary is shown.
           Verify this against Rafflex with a test order. */

        setTimeout(() => {

          try {

            game.completeGame();

            console.log(
              "🧸 Grab A Jelly V2 completed"
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

    /* GRAB */

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

      sound("grab");

      msg.textContent = "🕹️ Lowering the claw...";

      /* LOWER */

      requestAnimationFrame(() => {
        carriage.style.top = "35%";
      });

      later(() => {

        if (finished) return;

        app.classList.add("grabbing");

        msg.textContent = "🧸 GRABBING A JELLY!";

        const positions = [
          "18% 55%",
          "42% 62%",
          "68% 65%",
          "85% 70%"
        ];

        const choice = Math.min(
          3,
          Math.floor(position / 25)
        );

        held.style.setProperty(
          "--plush-position",
          positions[choice]
        );

        app.classList.add("held");

        sound("move");

        /* LIFT */

        later(() => {

          if (finished) return;

          msg.textContent = "✨ Lifting your Jelly...";

          carriage.style.top = "-5%";

          /* RESULT */

          later(() => {

            if (finished) return;

            const won = !!p.won;

            const ticket = p.ticket ?? "?";

            const prize = String(
              p.prize || "Prize"
            );

            if (won) {

              sound("win");

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

          }, 1200);

        }, 450);

      }, 1150);

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
      "🧸 Grab A Jelly V2 loaded",
      pots.length,
      "tickets"
    );

  });
}

/* INITIALISE */

function boot() {

  scan();

  [400,1000,2000,3500].forEach(delay => {
    setTimeout(scan, delay);
  });

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

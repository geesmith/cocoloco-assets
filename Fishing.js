
(function(){
"use strict";

const MARKER="🎣";
const FLAG="clFishingV9";
const BASE="https://geesmith.github.io/cocoloco-assets/";

const LAKE=BASE+"Fishinglake.png";
const ROD=BASE+"Fishingrod.png";
const BOOT=BASE+"Fishingboot.png";
const FISH=BASE+"Fishingfish.png";

/* PRELOAD IMAGES */

const imageStatus={};

[LAKE,ROD,BOOT,FISH].forEach(src=>{
const img=new Image();

imageStatus[src]=false;

img.onload=()=>{
imageStatus[src]=true;
};

img.onerror=()=>{
imageStatus[src]=false;
console.warn("🎣 Image failed to load:",src);
};

img.src=src;
});

/* HELPERS */

function esc(v){
return String(v??"").replace(/[&<>"']/g,c=>({
"&":"&amp;",
"<":"&lt;",
">":"&gt;",
'"':"&quot;",
"'":"&#39;"
}[c]));
}

function findTitle(widget){
let node=widget;

for(let depth=0;node&&depth<10;depth++){

for(const el of node.querySelectorAll("h1,h2,h3,h4,p,span")){

const text=(el.textContent||"").trim();

if(text.startsWith(MARKER)){
return text.slice(MARKER.length).trim()||
"Reel in the Riches";
}

}

node=node.parentElement;
}

return null;
}

/* STYLES */

function installStyles(){

if(document.getElementById("clFishingV9CSS"))return;

const style=document.createElement("style");
style.id="clFishingV9CSS";

style.textContent=`

.clf9{
position:relative;
width:100%;
box-sizing:border-box;
padding:14px 10px 18px;
border-radius:23px;
overflow:hidden;
font-family:Montserrat,Arial,sans-serif;
color:#fff;
text-align:center;
background:linear-gradient(145deg,#104a3d,#011d18);
border:2px solid #d9b866;
box-shadow:0 12px 30px #0005;
}

.clf9 *{
box-sizing:border-box;
}

.clf9-brand{
font-size:10px;
letter-spacing:3px;
font-weight:900;
color:#ebd18b;
}

.clf9-title{
margin:7px 0;
font:bold clamp(25px,5vw,39px) Georgia,serif;
color:#ffe5a0;
text-shadow:0 3px 10px #0009;
}

.clf9-count{
font-size:12px;
margin:9px 0 13px;
color:#e9eadf;
}

/* LAKE */

.clf9-lake{
position:relative;
width:100%;
aspect-ratio:3/2;
min-height:260px;
overflow:hidden;
border-radius:16px;
border:2px solid #d9b966;
cursor:pointer;
touch-action:manipulation;
isolation:isolate;
background:#073d32;
}

.clf9-lake-image{
position:absolute;
z-index:0;
inset:0;
width:100%;
height:100%;
object-fit:cover;
object-position:center;
pointer-events:none;
user-select:none;
}

.clf9-lake:focus-visible{
outline:3px solid #fff;
outline-offset:3px;
}

/* WATER */

.clf9-water{
position:absolute;
z-index:1;
inset:52% 0 0;
pointer-events:none;
opacity:.2;
background:repeating-linear-gradient(
175deg,
transparent 0 20px,
#e4d6a51c 21px,
transparent 23px 40px
);
animation:clf9water 6s linear infinite;
}

@keyframes clf9water{
to{background-position:0 65px}
}

/* MESSAGE */

.clf9-message{
position:absolute;
z-index:20;
top:10px;
left:5%;
width:90%;
padding:10px;
border-radius:30px;
border:1px solid #e6c776;
background:#002d25e9;
font-size:12px;
font-weight:900;
color:#fff4cc;
pointer-events:none;
}

/* REALISTIC ROD */

.clf9-rod{
position:absolute;
z-index:6;
bottom:5%;
left:2%;
width:64%;
height:85%;
object-fit:contain;
object-position:left bottom;
transform-origin:9% 91%;
pointer-events:none;
filter:drop-shadow(2px 5px 4px #0008);
}

.clf9.casting .clf9-rod{
animation:clf9cast .95s ease forwards;
}

@keyframes clf9cast{
0%{transform:rotate(0)}
27%{transform:rotate(-17deg)}
65%{transform:rotate(12deg)}
100%{transform:rotate(3deg)}
}

.clf9.biting .clf9-rod,
.clf9.reeling .clf9-rod{
animation:clf9bend .5s ease forwards;
}

@keyframes clf9bend{
from{transform:rotate(3deg)}
50%{transform:rotate(-8deg)}
to{transform:rotate(-3deg)}
}

/* SPLASH: NO EXTRA FLOAT */

.clf9-splash{
position:absolute;
left:69%;
top:66%;
z-index:7;
width:7px;
height:7px;
border-radius:50%;
opacity:0;
background:#daf5ee;
box-shadow:
-18px -12px #daf5ee,
18px -15px #daf5ee,
-10px -28px #daf5ee,
12px -32px #daf5ee;
pointer-events:none;
}

.clf9.casting .clf9-splash{
animation:clf9splash .55s .65s forwards;
}

.clf9.reeling .clf9-splash{
animation:clf9splash .6s forwards;
}

@keyframes clf9splash{
0%{
opacity:0;
transform:scale(.3);
}
40%{
opacity:1;
transform:scale(1.5);
}
100%{
opacity:0;
transform:scale(2.5);
}
}

/* BIG, VISIBLE CATCH */

.clf9-catch{
position:absolute;
z-index:30;
left:52%;
top:49%;
width:48%;
height:48%;
max-width:330px;
display:flex;
align-items:center;
justify-content:center;
opacity:0;
transform:translate(-50%,90px) scale(.25);
pointer-events:none;
}

.clf9-catch img{
display:block;
width:100%;
height:100%;
object-fit:contain;
filter:drop-shadow(0 12px 14px #000c);
}

.clf9-catch.win img{
filter:
drop-shadow(0 12px 14px #000c)
drop-shadow(0 0 20px #ffdf68);
}

.clf9-catch-fallback{
display:flex;
align-items:center;
justify-content:center;
width:100%;
height:100%;
font-size:clamp(75px,16vw,150px);
filter:drop-shadow(0 8px 10px #0009);
}

.clf9-catch.win .clf9-catch-fallback{
filter:
drop-shadow(0 8px 10px #0009)
drop-shadow(0 0 20px #ffdf68);
}

.clf9.reeling .clf9-catch{
animation:clf9catch 1.2s ease forwards;
}

@keyframes clf9catch{
0%{
opacity:0;
transform:translate(-50%,110px) scale(.25);
}
55%{
opacity:1;
transform:translate(-50%,-30px) scale(1.2);
}
100%{
opacity:1;
transform:translate(-50%,-12px) scale(1);
}
}

/* RESULT */

.clf9-result{
display:none;
margin:12px 0 0;
padding:15px 10px;
border-radius:15px;
border:1.5px solid #e3c16c;
background:linear-gradient(145deg,#135341,#022c24);
box-shadow:0 5px 15px #0005;
animation:clf9result .35s ease both;
}

@keyframes clf9result{
from{
opacity:0;
transform:translateY(12px);
}
to{
opacity:1;
transform:translateY(0);
}
}

.clf9-result strong{
display:block;
font-family:Georgia,serif;
font-size:clamp(19px,4vw,27px);
color:#ffe39a;
margin:6px 0;
}

.clf9-result small{
display:block;
margin-top:5px;
color:#dae8dc;
}

/* BUTTONS */

.clf9-controls{
display:flex;
justify-content:center;
flex-wrap:wrap;
gap:7px;
margin-top:12px;
}

.clf9-controls button{
border:1px solid #ddbd70;
border-radius:30px;
padding:10px 14px;
background:linear-gradient(#18654f,#063b2e);
color:#fff7e3;
font:800 12px Montserrat,Arial,sans-serif;
cursor:pointer;
}

.clf9-controls button:disabled{
opacity:.42;
cursor:default;
}

/* SUMMARY */

.clf9-summary{
display:none;
margin-top:14px;
padding:15px;
border:1px solid #dec071;
border-radius:15px;
background:#01271f;
}

.clf9-summary h3{
color:#ffe099;
font:700 20px Georgia,serif;
margin:0 0 12px;
}

.clf9-summary-row{
padding:10px;
margin:6px 0;
background:#ffffff13;
border-radius:9px;
font-size:12px;
}

@media(max-width:500px){

.clf9{
padding:12px 6px 15px;
}

.clf9-lake{
min-height:230px;
}

.clf9-rod{
width:68%;
height:82%;
}

.clf9-catch{
width:55%;
height:50%;
}

.clf9-controls button{
padding:9px 11px;
font-size:11px;
}

}

`;

document.head.appendChild(style);
}

/* FIND GAME */

function scan(){

document.querySelectorAll(
'[x-data^="potDropGame_"]'
).forEach(widget=>{

if(widget.dataset[FLAG])return;

const title=findTitle(widget);
if(!title)return;

if(!window.Alpine||!window.Alpine.$data)return;

let game;

try{
game=window.Alpine.$data(widget);
}catch(e){
return;
}

if(
!game||
!Array.isArray(game.pots)||
!game.pots.length||
typeof game.completeGame!=="function"
)return;

const id=(widget.getAttribute("x-data")||"")
.split("_").pop();

const arena=
document.getElementById("pot-container_"+id)||
widget.querySelector('[id^="pot-container_"]');

if(!arena)return;

widget.dataset[FLAG]="1";

installStyles();

const pots=game.pots.slice();

let index=0;
let busy=false;
let auto=false;
let finished=false;
let timers=[];
let wins=[];
let processed=new Set();

function later(fn,ms){
const timer=setTimeout(fn,ms);
timers.push(timer);
return timer;
}

function clearTimers(){
timers.forEach(clearTimeout);
timers=[];
}

/* IMPROVED SOUND ENGINE */

function audioContext(){

try{

const Audio=
window.AudioContext||
window.webkitAudioContext;

if(!Audio)return null;

const ctx=
window.__clFishingAudio||
(window.__clFishingAudio=new Audio());

if(ctx.state==="suspended"){
ctx.resume();
}

return ctx;

}catch(e){
return null;
}

}

function tone(ctx,freq,duration,type,volume,delay=0,endFreq){

try{

const osc=ctx.createOscillator();
const gain=ctx.createGain();

const start=ctx.currentTime+delay;

osc.type=type;
osc.frequency.setValueAtTime(freq,start);

if(endFreq){
osc.frequency.exponentialRampToValueAtTime(
Math.max(1,endFreq),
start+duration
);
}

gain.gain.setValueAtTime(.0001,start);
gain.gain.exponentialRampToValueAtTime(
volume,start+.012
);
gain.gain.exponentialRampToValueAtTime(
.0001,start+duration
);

osc.connect(gain);
gain.connect(ctx.destination);

osc.start(start);
osc.stop(start+duration+.03);

}catch(e){}

}

function noise(ctx,duration,volume,delay=0){

try{

const length=Math.ceil(ctx.sampleRate*duration);
const buffer=ctx.createBuffer(
1,length,ctx.sampleRate
);

const data=buffer.getChannelData(0);

for(let i=0;i<length;i++){
data[i]=(Math.random()*2-1);
}

const source=ctx.createBufferSource();
const filter=ctx.createBiquadFilter();
const gain=ctx.createGain();

source.buffer=buffer;

filter.type="lowpass";
filter.frequency.value=900;

const start=ctx.currentTime+delay;

gain.gain.setValueAtTime(.0001,start);
gain.gain.exponentialRampToValueAtTime(
volume,start+.025
);
gain.gain.exponentialRampToValueAtTime(
.0001,start+duration
);

source.connect(filter);
filter.connect(gain);
gain.connect(ctx.destination);

source.start(start);
source.stop(start+duration+.01);

}catch(e){}

}

function sound(type){

const ctx=audioContext();
if(!ctx)return;

if(type==="cast"){

noise(ctx,.35,.055);
tone(ctx,260,.36,"sine",.07,0,520);
tone(ctx,480,.25,"triangle",.025,.08,250);

}

if(type==="splash"){

noise(ctx,.48,.11);
tone(ctx,170,.28,"sine",.07,0,65);
tone(ctx,300,.12,"sine",.035,.12,150);

}

if(type==="bite"){

tone(ctx,440,.12,"triangle",.09);
tone(ctx,590,.13,"triangle",.09,.13);
tone(ctx,780,.18,"sine",.08,.26);

}

if(type==="reel"){

for(let i=0;i<7;i++){

tone(
ctx,
310+i*14,
.045,
"triangle",
.025,
i*.075
);

}

tone(ctx,170,.5,"sine",.035,0,280);

}

if(type==="boot"){

tone(ctx,170,.2,"triangle",.13);
tone(ctx,105,.3,"sine",.11,.08,65);
noise(ctx,.16,.045,.06);

}

if(type==="win"){

const notes=[
523.25,
659.25,
783.99,
1046.5,
1318.5
];

notes.forEach((freq,i)=>{

tone(
ctx,
freq,
.4,
"triangle",
.09,
i*.11
);

});

tone(ctx,1567.98,.65,"sine",.05,.5);
tone(ctx,2093,.7,"sine",.035,.62);

}

}

/* HIDE NATIVE GAME */

widget.querySelectorAll("button").forEach(btn=>{

if((btn.textContent||"").trim()!=="Start Game")return;

let parent=btn.parentElement;

while(parent&&parent!==widget){

if(
parent.textContent.includes("Pot Drop Game")&&
parent.textContent.includes("Drop Speed")
){

parent.style.display="none";
break;

}

parent=parent.parentElement;

}

});

[...arena.children].forEach(el=>{
el.style.display="none";
});

Object.assign(arena.style,{
height:"auto",
minHeight:"0",
overflow:"visible",
opacity:"1",
filter:"none",
pointerEvents:"auto"
});

/* BUILD INTERFACE */

const app=document.createElement("div");
app.className="clf9";

app.innerHTML=`

<div class="clf9-brand">
✦ COCOLOCO COMPS ✦
</div>

<h2 class="clf9-title">
${esc(title)}
</h2>

<div class="clf9-count" data-count></div>

<div
class="clf9-lake"
data-lake
role="button"
tabindex="0"
aria-label="Cast fishing rod"
>

<img
class="clf9-lake-image"
src="${LAKE}"
alt=""
draggable="false"
>

<div class="clf9-water"></div>

<div class="clf9-message" data-msg>
🎣 TAP THE LAKE TO CAST
</div>

<img
class="clf9-rod"
src="${ROD}"
alt=""
draggable="false"
>

<div class="clf9-splash"></div>

<div class="clf9-catch" data-catch></div>

</div>

<div
class="clf9-result"
data-result
aria-live="polite"
></div>

<div class="clf9-controls">

<button type="button" data-auto>
🎣 Auto Fish
</button>

<button type="button" data-pause disabled>
⏸ Pause
</button>

<button type="button" data-skip>
⏭ Skip All
</button>

</div>

<div class="clf9-summary" data-summary>

<h3>🎣 Your Fishing Results</h3>

<div data-list></div>

</div>

`;

arena.appendChild(app);

const $=selector=>app.querySelector(selector);

const lake=$("[data-lake]");
const msg=$("[data-msg]");
const catchEl=$("[data-catch]");
const result=$("[data-result]");
const autoBtn=$("[data-auto]");
const pauseBtn=$("[data-pause]");
const skipBtn=$("[data-skip]");

/* SHOW FISH OR BOOT */

function showCatch(won){

const src=won?FISH:BOOT;
const fallback=won?"🐠":"🥾";

catchEl.classList.toggle("win",won);

catchEl.innerHTML=`
<img
src="${src}"
alt="${won?"Golden fish":"Old boot"}"
draggable="false"
>
`;

const img=catchEl.querySelector("img");

function useFallback(){

if(!img.isConnected)return;

catchEl.innerHTML=`
<div class="clf9-catch-fallback">
${fallback}
</div>
`;

}

img.addEventListener("error",useFallback,{
once:true
});

if(img.complete&&img.naturalWidth===0){
useFallback();
}

}

/* TICKET COUNTER */

function updateCount(){

const remaining=Math.max(
0,pots.length-index
);

$("[data-count]").textContent=
remaining===1?
"1 cast remaining":
remaining+" casts remaining";

}

/* REGISTER RESULTS */

function register(p){

if(processed.has(index))return;

processed.add(index);

const won=!!p?.won;

if(won){

wins.push({
ticket:p.ticket??"?",
prize:String(p.prize||"Prize")
});

}

game.currentIndex=Math.min(
pots.length,
Number(game.currentIndex||0)+1
);

game.processedPots=
Number(game.processedPots||0)+1;

if(won){

game.revealedWins=
Number(game.revealedWins||0)+1;

}

}

/* RESET */

function reset(){

app.classList.remove(
"casting",
"waiting",
"biting",
"reeling"
);

catchEl.className="clf9-catch";
catchEl.innerHTML="";

result.style.display="none";
result.innerHTML="";

}

/* CAST */

function cast(){

if(
finished||
busy||
index>=pots.length
)return;

busy=true;

reset();
sound("cast");

msg.textContent="🎣 CASTING YOUR LINE...";

void app.offsetWidth;

app.classList.add("casting");

later(()=>{

if(finished)return;

app.classList.remove("casting");
app.classList.add("waiting");

sound("splash");

msg.textContent=
"🌊 WAITING FOR A BITE...";

later(()=>{

if(finished)return;

app.classList.remove("waiting");
app.classList.add("biting");

sound("bite");

msg.textContent="🎣 FISH ON!";

later(reel,500);

},1000);

},950);

}

/* REEL IN */

function reel(){

if(finished)return;

const p=pots[index];
if(!p)return;

const won=!!p.won;
const ticket=p.ticket??"?";
const prize=String(p.prize||"Prize");

app.classList.remove("biting");
app.classList.add("reeling");

showCatch(won);

sound("reel");

later(()=>{

if(finished)return;

sound(won?"win":"boot");

result.innerHTML=won?`

<div>✨ GOLDEN CATCH ✨</div>

<strong>YOU'VE HOOKED A WIN!</strong>

<div>Ticket #${esc(ticket)}</div>

<strong>${esc(prize)}</strong>

`:`

<div>🥾 YOU CAUGHT AN OLD BOOT!</div>

<strong>No instant win</strong>

<div>Ticket #${esc(ticket)}</div>

<small>
Still entered into the main draw 💚
</small>

`;

result.style.display="block";

msg.textContent=won?
"✨ GOLDEN FISH CAUGHT!":
"🥾 BETTER LUCK NEXT CAST!";

register(p);

index++;
updateCount();

busy=false;

if(index>=pots.length){

later(finish,1600);

}else if(auto){

later(cast,1300);

}else{

msg.textContent+=" TAP TO CAST AGAIN";

}

},1250);

}

/* AUTO / PAUSE */

function stopAuto(){

auto=false;

autoBtn.disabled=finished;
autoBtn.textContent="🎣 Auto Fish";

pauseBtn.disabled=true;

}

/* COMPLETE */

function finish(){

if(finished)return;

finished=true;
busy=false;

clearTimers();
stopAuto();

autoBtn.disabled=true;
pauseBtn.disabled=true;
skipBtn.disabled=true;

msg.textContent="🎣 FISHING COMPLETE";

$("[data-list]").innerHTML=wins.length?

wins.map(x=>`

<div class="clf9-summary-row">
Ticket #${esc(x.ticket)} • ${esc(x.prize)}
</div>

`).join(""):

`

<div class="clf9-summary-row">
No instant wins this time.<br>
Still entered into the main draw 💚
</div>

`;

$("[data-summary]").style.display="block";

try{

if(Array.isArray(game.activePots)){
game.activePots.length=0;
}

game.currentIndex=pots.length;
game.processedPots=pots.length;

later(()=>{

try{

game.completeGame();

console.log(
"🎣 Fishing V9 completed"
);

}catch(e){

console.error(
"Fishing completion error:",
e
);

}

},150);

}catch(e){

console.error(
"Fishing state error:",
e
);

}

}

/* CONTROLS */

lake.addEventListener("click",()=>{

if(!auto)cast();

});

lake.addEventListener("keydown",e=>{

if(e.key==="Enter"||e.key===" "){

e.preventDefault();

if(!auto)cast();

}

});

autoBtn.addEventListener("click",()=>{

if(finished||auto)return;

auto=true;

autoBtn.disabled=true;
autoBtn.textContent="🎣 Auto Running";

pauseBtn.disabled=false;

if(!busy)cast();

});

pauseBtn.addEventListener(
"click",
stopAuto
);

skipBtn.addEventListener("click",()=>{

if(finished)return;

clearTimers();
stopAuto();

while(index<pots.length){

register(pots[index]);
index++;

}

updateCount();
finish();

});

updateCount();

console.log(
"🎣 CocoLoco Fishing V9 loaded",
pots.length,
"tickets"
);

});

}

/* INITIALISE */

function boot(){

scan();

[400,1000,2000,3500].forEach(delay=>{
setTimeout(scan,delay);
});

let timer;

new MutationObserver(()=>{

clearTimeout(timer);

timer=setTimeout(scan,120);

}).observe(document.body,{
childList:true,
subtree:true
});

}

if(document.readyState==="loading"){

document.addEventListener(
"DOMContentLoaded",
boot
);

}else{

boot();

}

document.addEventListener(
"livewire:navigated",
scan
);

})();

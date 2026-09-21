/* CocoLoco Grab A Jelly V3 | visual/audio upgrade.
   TEST with Rafflex before customers. */
(function(){
'use strict';

const BASE='https://geesmith.github.io/cocoloco-assets/';
const ASSETS={
machine:BASE+'Grabajelly-machine.png',
claw:BASE+'Grabajelly-claw.png',
plushies:BASE+'Grab_A_Jelly_Transparent.png'
};

const FLAG='clGrabJellyV3';
const TITLE=/^🧸\s*Grab\s+A\s+Jelly\s*🧸?\s*$/i;

const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({
'&':'&amp;',
'<':'&lt;',
'>':'&gt;',
'"':'&quot;',
"'":'&#39;'
}[c]));

function correctTitle(widget){
let n=widget;
while(n&&n!==document.body){
if(n.querySelectorAll('[x-data^="potDropGame_"]').length>1)return false;
if([...n.querySelectorAll('h1,h2,h3,h4')].filter(h=>TITLE.test((h.textContent||'').trim())).length===1)return true;
n=n.parentElement;
}
return false;
}

function styles(){
if(document.getElementById('clj3-css'))return;
const s=document.createElement('style');
s.id='clj3-css';
s.textContent=`

.clj3,.clj3 *{box-sizing:border-box}

.clj3{
position:relative;
isolation:isolate;
overflow:hidden;
width:100%;
padding:clamp(9px,2.5vw,19px);
border:4px ridge #f7d777;
border-radius:25px;
color:#fff;
text-align:center;
font-family:Montserrat,Arial,sans-serif;
background:
radial-gradient(ellipse at 20% 0%,#2fc39a55,transparent 43%),
radial-gradient(ellipse at 90% 65%,#f9ce6250,transparent 44%),
linear-gradient(135deg,#b67b1c 0%,#ffdf81 9%,#06563e 22%,#01392e 50%,#14795a 76%,#f7d779 94%,#815213 100%);
box-shadow:
inset 0 0 0 2px #fff1a7,
inset 0 0 32px #001e17,
0 12px 30px #0007;
}

.clj3:before{
content:'✦  ✧  ✦  ✧  ✦';
position:absolute;
inset:5px 0 auto;
color:#ffeab4;
opacity:.65;
letter-spacing:clamp(8px,4vw,26px);
pointer-events:none;
animation:clj3twinkle 2.8s ease-in-out infinite alternate;
}

.clj3-brand{
position:relative;
margin:15px 0 3px;
color:#ffebac;
font-size:11px;
font-weight:900;
letter-spacing:3px;
text-shadow:0 2px 5px #000;
}

.clj3 h2{
margin:5px 0 7px;
font:900 clamp(25px,6vw,39px) Georgia,serif;
color:#ffdf87;
text-shadow:0 2px #75440c,0 4px 8px #000,0 0 16px #f6c44a;
}

.clj3-count{
font-size:13px;
color:#fff0bb;
margin-bottom:11px;
}

.clj3-machine{
position:relative;
width:100%;
max-width:560px;
margin:auto;
aspect-ratio:1;
overflow:hidden;
isolation:isolate;
border-radius:15px;
box-shadow:0 0 0 2px #f6d27b,0 7px 25px #00190f;
}

.clj3-bg{
position:absolute;
inset:0;
width:100%;
height:100%;
object-fit:fill;
pointer-events:none;
}

.clj3-glass{
  position:absolute;
  left:15%;
  top:23%;
  width:70%;
  height:53%;
  overflow:visible;
  z-index:2;
  pointer-events:none;
}

.clj3-pile{
  position:absolute;
  left:-21%;
  bottom:0;
  width:142%;
  height:72%;
  max-height:none;
  object-fit:fill;
  z-index:5;
  display:block;
  opacity:1;
  filter:drop-shadow(0 7px 5px #0007);
}
.clj3-carriage{
position:absolute;
z-index:8;
left:50%;
top:-5%;
width:27%;
height:38%;
transform:translateX(-50%);
transition:left .22s ease,top 1.2s cubic-bezier(.4,0,.3,1);
}

.clj3-claw{
width:100%;
height:100%;
object-fit:contain;
filter:drop-shadow(0 4px 7px #000a);
transform-origin:50% 60%;
transition:transform .35s;
}

.clj3.grabbing .clj3-claw{
transform:scaleX(.76);
}

.clj3-held{
position:absolute;
z-index:7;
left:50%;
top:69%;
width:35%;
aspect-ratio:1;
transform:translateX(-50%) scale(.8);
opacity:0;
border-radius:50%;
background-image:var(--plush-image);
background-size:650% auto;
background-repeat:no-repeat;
background-position:var(--plush-position,50% 70%);
filter:drop-shadow(0 6px 5px #0008);
transition:opacity .2s,top 1.2s ease,transform .75s ease;
}

.clj3.held .clj3-held{
opacity:1;
}

.clj3.dropped .clj3-held{
top:195%;
opacity:0;
transform:translateX(-50%) rotate(65deg);
transition:top .75s ease-in,opacity .75s,transform .75s ease-in;
}

.clj3-prize{
display:none;
position:absolute;
z-index:20;
top:28%;
left:8%;
width:84%;
padding:15px 8px;
border-radius:15px;
border:3px solid #ffdf85;
background:linear-gradient(135deg,#07583df5,#012c23f5);
color:#ffeb9b;
font-size:clamp(15px,4vw,24px);
font-weight:900;
overflow-wrap:anywhere;
box-shadow:0 0 35px #ffd05a,inset 0 0 18px #e8bd4833;
animation:clj3pop .5s ease both;
}

.clj3.win .clj3-machine:after{
content:'✦ ✧ ✨ ✦ ✧ ✨ ✦';
position:absolute;
z-index:19;
inset:16% 0 auto;
font-size:clamp(15px,4vw,27px);
color:#ffe88c;
animation:clj3twinkle .35s alternate infinite;
pointer-events:none;
}

.clj3-message{
margin:13px 0;
min-height:25px;
font-size:13px;
font-weight:900;
color:#ffedac;
text-shadow:0 2px 4px #000;
}

.clj3-controls{
display:flex;
flex-wrap:wrap;
justify-content:center;
gap:9px;
}

.clj3 button{
border:2px solid #f8d981;
border-radius:13px;
background:linear-gradient(160deg,#43b68b 0%,#0b6249 42%,#03402e 55%,#0c7355 100%);
box-shadow:inset 0 2px 2px #ffffff70,inset 0 -4px 3px #001c16,0 5px 0 #78531b,0 7px 10px #0008;
color:white;
font:900 13px Montserrat,Arial,sans-serif;
padding:12px;
min-height:46px;
cursor:pointer;
touch-action:manipulation;
text-shadow:0 1px 2px #000;
}

.clj3 button:active:not(:disabled){
transform:translateY(3px);
box-shadow:inset 0 2px 3px #0008,0 2px 0 #78531b;
}

.clj3 button:disabled{
opacity:.45;
cursor:default;
}

.clj3 [data-grab]{
background:linear-gradient(160deg,#fff3b4,#ffd367 38%,#b7791c 60%,#ffdf7d);
color:#123c2c;
text-shadow:none;
}

.clj3-result,.clj3-summary{
display:none;
margin-top:14px;
padding:15px;
border-radius:14px;
border:2px solid #e8c56a;
background:linear-gradient(145deg,#07513de8,#01271fe8);
overflow-wrap:anywhere;
box-shadow:inset 0 0 18px #e9c45b20;
}

.clj3-result strong{
display:block;
margin:6px 0;
color:#ffe39a;
font-size:20px;
}

.clj3-summary-row{
padding:9px;
margin:6px 0;
border-radius:8px;
background:#ffffff12;
overflow-wrap:anywhere;
}

@keyframes clj3pop{
from{opacity:0;transform:scale(.65)}
to{opacity:1;transform:scale(1)}
}

@keyframes clj3twinkle{
from{opacity:.35;filter:brightness(.8)}
to{opacity:1;filter:brightness(1.5)}
}

@media(max-width:500px){
.clj3{padding:7px}
.clj3-controls button{font-size:11px;padding:10px}
}

@media(prefers-reduced-motion:reduce){
.clj3 *{
transition-duration:.01ms!important;
animation-duration:.01ms!important;
}
}
`;
document.head.appendChild(s);
}

function scan(){
document.querySelectorAll('[x-data^="potDropGame_"]').forEach(widget=>{

if(widget.dataset[FLAG]||!correctTitle(widget)||!window.Alpine?.$data)return;

if(widget.dataset.clGrabJellyV1||widget.dataset.clGrabJellyV2){
console.warn('Grab A Jelly: disable V1/V2 before V3');
return;
}

let game;
try{
game=window.Alpine.$data(widget);
}catch(e){return}

if(!game||!Array.isArray(game.pots)||!game.pots.length||typeof game.completeGame!=='function')return;

const id=(widget.getAttribute('x-data')||'').split('_').pop();

const arena=document.getElementById('pot-container_'+id)||widget.querySelector('[id^="pot-container_"]');

if(!arena)return;

widget.dataset[FLAG]='1';
styles();

const pots=game.pots.slice();

let index=0,busy=false,finished=false,muted=false,position=50,wins=[],timers=[],processed=new Set();

const later=(fn,ms)=>{
const t=setTimeout(fn,ms);
timers.push(t);
return t;
};

const clearTimers=()=>{
timers.forEach(clearTimeout);
timers=[];
};

widget.querySelectorAll('button').forEach(btn=>{
if((btn.textContent||'').trim()!=='Start Game')return;
let p=btn.parentElement;
while(p&&p!==widget){
if(p.textContent.includes('Pot Drop Game')&&p.textContent.includes('Drop Speed')){
p.style.display='none';
break;
}
p=p.parentElement;
}
});

[...arena.children].forEach(el=>el.style.display='none');

Object.assign(arena.style,{
height:'auto',
minHeight:'0',
overflow:'visible',
opacity:'1',
filter:'none',
pointerEvents:'auto'
});

const app=document.createElement('div');
app.className='clj3';

app.innerHTML=`
<div class="clj3-brand">✦ COCOLOCO COMPS ✦</div>
<h2>🧸 GRAB A JELLY 🧸</h2>
<div class="clj3-count" data-count></div>

<div class="clj3-machine">
<img class="clj3-bg" src="${ASSETS.machine}" alt="CocoLoco claw machine" draggable="false">

<div class="clj3-glass">
<img class="clj3-pile" src="${ASSETS.plushies}" alt="" draggable="false">

<div class="clj3-carriage" data-carriage>
<img class="clj3-claw" src="${ASSETS.claw}" alt="" draggable="false">
<div class="clj3-held" data-held></div>
</div>
</div>

<div class="clj3-prize" data-prize aria-live="polite"></div>
</div>

<div class="clj3-message" data-msg aria-live="polite">Move your claw and press GRAB!</div>

<div class="clj3-controls">
<button type="button" data-left>◀ LEFT</button>
<button type="button" data-grab>🕹️ GRAB!</button>
<button type="button" data-right>RIGHT ▶</button>
<button type="button" data-mute aria-pressed="false">🔊 Sound on</button>
<button type="button" data-skip>⏭ Skip All</button>
</div>

<div class="clj3-result" data-result aria-live="polite"></div>

<div class="clj3-summary" data-summary>
<h3>🧸 Your Grab A Jelly Results</h3>
<div data-list></div>
</div>
`;

arena.appendChild(app);

const $=s=>app.querySelector(s);
const carriage=$('[data-carriage]');
const held=$('[data-held]');
const msg=$('[data-msg]');
const prizeEl=$('[data-prize]');
const result=$('[data-result]');

held.style.setProperty('--plush-image',`url("${ASSETS.plushies}")`);

/* SOUND ENGINE */

let audio=null;

function context(){
const C=window.AudioContext||window.webkitAudioContext;
if(!C)return null;
if(!audio)audio=new C();
if(audio.state==='suspended')audio.resume().catch(()=>{});
return audio;
}

function tone(ctx,start,freq,end,duration,type='sine',volume=.07){
const o=ctx.createOscillator(),g=ctx.createGain();
o.type=type;
o.frequency.setValueAtTime(Math.max(1,freq),start);
o.frequency.exponentialRampToValueAtTime(Math.max(1,end),start+duration);
g.gain.setValueAtTime(.0001,start);
g.gain.exponentialRampToValueAtTime(volume,start+.012);
g.gain.exponentialRampToValueAtTime(.0001,start+duration);
o.connect(g);
g.connect(ctx.destination);
o.start(start);
o.stop(start+duration+.01);
}

function noise(ctx,start,duration,volume=.06){
const len=Math.ceil(ctx.sampleRate*duration);
const buffer=ctx.createBuffer(1,len,ctx.sampleRate);
const data=buffer.getChannelData(0);

for(let i=0;i<len;i++){
data[i]=(Math.random()*2-1)*(1-i/len);
}

const src=ctx.createBufferSource();
const filter=ctx.createBiquadFilter();
const gain=ctx.createGain();

src.buffer=buffer;
filter.type='lowpass';
filter.frequency.value=850;

gain.gain.setValueAtTime(volume,start);
gain.gain.exponentialRampToValueAtTime(.0001,start+duration);

src.connect(filter);
filter.connect(gain);
gain.connect(ctx.destination);
src.start(start);
src.stop(start+duration);
}

function sound(kind){
if(muted)return;

try{
const c=context();
if(!c)return;
const t=c.currentTime+.015;

if(kind==='move'){
tone(c,t,180,265,.15,'sawtooth',.027);
tone(c,t+.09,220,160,.15,'triangle',.035);
}
else if(kind==='lower'){
tone(c,t,135,85,.8,'sawtooth',.032);
tone(c,t,250,165,.8,'triangle',.025);
noise(c,t,.55,.022);
}
else if(kind==='grab'){
noise(c,t,.13,.13);
tone(c,t,135,65,.2,'square',.065);
tone(c,t+.13,420,260,.15,'triangle',.055);
}
else if(kind==='lift'){
tone(c,t,100,240,.85,'sawtooth',.027);
tone(c,t,180,350,.85,'triangle',.028);
}
else if(kind==='lose'){
tone(c,t,420,170,.38,'triangle',.07);
noise(c,t+.2,.22,.075);
tone(c,t+.34,220,115,.36,'sine',.06);
}
else if(kind==='win'){
[523.25,659.25,783.99,1046.5,1318.5].forEach((f,i)=>{
tone(c,t+i*.115,f,f*1.015,.35,'triangle',.085);
tone(c,t+i*.115,f/2,f/2,.31,'sine',.025);
});
tone(c,t+.58,523,1046,.52,'sine',.055);
}
}catch(e){
console.warn('Grab A Jelly sound unavailable',e);
}
}

function buttons(disabled){
['[data-left]','[data-right]','[data-grab]'].forEach(s=>$(s).disabled=disabled);
}

function count(){
const n=Math.max(0,pots.length-index);
$('[data-count]').textContent=n+' ticket'+(n===1?'':'s')+' remaining';
}

function register(p){
if(processed.has(index))return;
processed.add(index);

const won=!!p.won;

if(won){
wins.push({
ticket:p.ticket??'?',
prize:String(p.prize||'Prize')
});
}

game.currentIndex=Math.min(pots.length,Number(game.currentIndex||0)+1);
game.processedPots=Number(game.processedPots||0)+1;

if(won){
game.revealedWins=Number(game.revealedWins||0)+1;
}
}

function reset(){
app.classList.remove('grabbing','held','dropped','win');
carriage.style.top='-5%';
held.style.setProperty('--plush-position','50% 70%');
prizeEl.style.display='none';
prizeEl.textContent='';
result.style.display='none';
result.innerHTML='';
}

function finish(){
if(finished)return;
finished=true;
busy=false;
clearTimers();
buttons(true);
$('[data-skip]').disabled=true;
msg.textContent='🧸 All tickets revealed!';

$('[data-list]').innerHTML=wins.length?
wins.map(w=>`<div class="clj3-summary-row">Ticket #${esc(w.ticket)} • ${esc(w.prize)}</div>`).join(''):
'<div class="clj3-summary-row">No instant wins this time.</div>';

$('[data-summary]').style.display='block';

try{
if(Array.isArray(game.activePots))game.activePots.length=0;
game.currentIndex=pots.length;
game.processedPots=pots.length;

setTimeout(()=>{
try{
game.completeGame();
console.log('🧸 Grab A Jelly V3 completed');
}catch(e){
console.error('🧸 Completion error',e);
}
},150);

}catch(e){
console.error('🧸 Game state error',e);
}
}

function grab(){
if(finished||busy||index>=pots.length)return;
const p=pots[index];
if(!p)return;

busy=true;
buttons(true);
reset();
sound('lower');
msg.textContent='🕹️ Lowering the claw...';

requestAnimationFrame(()=>{
carriage.style.top='35%';
});

later(()=>{
if(finished)return;

app.classList.add('grabbing');
msg.textContent='🧸 GRABBING A JELLY!';

held.style.setProperty('--plush-position',
['18% 30%','43% 45%','65% 65%','82% 75%'][Math.min(3,Math.floor(position/25))]
);

app.classList.add('held');
sound('grab');

later(()=>{
if(finished)return;

msg.textContent='✨ Lifting your Jelly...';
carriage.style.top='-5%';
sound('lift');

later(()=>{
if(finished)return;

const won=!!p.won;
const ticket=p.ticket??'?';
const prize=String(p.prize||'Prize');

if(won){
sound('win');
app.classList.add('win');
msg.textContent='🎉 YOU GRABBED A WIN!';
prizeEl.textContent='✨ '+prize+' ✨';
prizeEl.style.display='block';
result.innerHTML=`<strong>🧸 WINNER!</strong>Ticket #${esc(ticket)}<strong>${esc(prize)}</strong>`;
}else{
sound('lose');
msg.textContent='💚 Your Jelly slipped!';
app.classList.add('dropped');
result.innerHTML=`<strong>No instant win this time</strong>Ticket #${esc(ticket)}<br><small>Check the competition terms for main-draw eligibility.</small>`;
}

result.style.display='block';
register(p);
index++;
count();
busy=false;

if(index>=pots.length){
later(finish,1900);
}else{
later(()=>{
if(finished)return;
reset();
buttons(false);
msg.textContent='Move the claw and GRAB again!';
},won?1800:1200);
}
},1250);
},450);
},1200);
}

function move(delta){
if(busy||finished)return;
position=Math.max(12,Math.min(88,position+delta));
carriage.style.left=position+'%';
sound('move');
}

$('[data-left]').addEventListener('click',()=>move(-10));
$('[data-right]').addEventListener('click',()=>move(10));
$('[data-grab]').addEventListener('click',grab);

$('[data-mute]').addEventListener('click',()=>{
muted=!muted;
$('[data-mute]').textContent=muted?'🔇 Sound off':'🔊 Sound on';
$('[data-mute]').setAttribute('aria-pressed',String(muted));
});

$('[data-skip]').addEventListener('click',()=>{
if(finished)return;
clearTimers();
while(index<pots.length){
register(pots[index]);
index++;
}
count();
finish();
});

count();
console.log('🧸 Grab A Jelly V3 loaded',pots.length,'tickets');
});
}

function boot(){
scan();
[400,1000,2000,3500].forEach(ms=>setTimeout(scan,ms));
let timer;
new MutationObserver(()=>{
clearTimeout(timer);
timer=setTimeout(scan,120);
}).observe(document.body,{childList:true,subtree:true});
}

if(document.readyState==='loading'){
document.addEventListener('DOMContentLoaded',boot);
}else{
boot();
}

document.addEventListener('livewire:navigated',scan);
})();

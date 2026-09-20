/* CocoLoco Grab a Jelly V1 | Pot Drop adapter | 🧸 Grab A Jelly 🧸 */
(function(){
'use strict';
const MARKER='🧸', FLAG='clGrabJellyV1', STYLE='clGrabJellyV1CSS';
const TITLE=/^🧸\s*Grab\s+A\s+Jelly\s*🧸?\s*$/i;
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));

function correctTitle(widget){
 let n=widget;
 while(n&&n!==document.body){
  if(n.querySelectorAll('[x-data^="potDropGame_"]').length>1)return false;
  const matches=[...n.querySelectorAll('h1,h2,h3,h4')].filter(h=>TITLE.test((h.textContent||'').trim()));
  if(matches.length===1)return true;
  n=n.parentElement;
 }
 return false;
}

function styles(){
 if(document.getElementById(STYLE))return;
 const s=document.createElement('style');
 s.id=STYLE;
 s.textContent=`
.clj{position:relative;isolation:isolate;width:100%;padding:13px;box-sizing:border-box;border:3px solid #d9b65f;border-radius:23px;background:linear-gradient(135deg,#07523d,#011c17);color:#fff;text-align:center;font-family:Montserrat,Arial,sans-serif;box-shadow:0 12px 28px #0005}
.clj *{box-sizing:border-box}
.clj h2{font:900 clamp(24px,6vw,37px) Georgia,serif;color:#ffdc81;margin:7px 0}
.clj small{color:#f5dfab}
.clj-machine{position:relative;margin:12px auto 0;max-width:560px;height:clamp(310px,78vw,450px);overflow:hidden;border:9px solid #c49b3b;border-radius:18px 18px 8px 8px;background:radial-gradient(circle at 50% 10%,#246c5b,#073a33 65%,#031d19);box-shadow:inset 0 0 0 3px #ffe6a0,inset 0 0 32px #0009}
.clj-machine:before{content:'✦ COCOLOCO ✦';position:absolute;top:0;left:0;right:0;z-index:4;background:linear-gradient(#ffe9a7,#b8872b);color:#173e2c;font-weight:1000;letter-spacing:2px;padding:8px;font-size:clamp(11px,3vw,17px)}
.clj-rail{position:absolute;top:42px;left:7%;width:86%;height:7px;border-radius:9px;background:linear-gradient(#fff4bc,#927026)}
.clj-carriage{position:absolute;z-index:8;top:45px;left:50%;width:65px;height:35px;transform:translateX(-50%);transition:left .16s ease}
.clj-carriage:before{content:'';position:absolute;left:8px;right:8px;top:0;height:24px;border:3px solid #ffe5a0;border-radius:8px;background:#b68a32}
.clj-rope{position:absolute;left:50%;top:22px;width:4px;height:var(--rope,52px);transform:translateX(-50%);background:repeating-linear-gradient(#e7e8e6 0 5px,#7e8783 5px 8px);transition:height .8s ease}
.clj-claw{position:absolute;left:50%;top:calc(20px + var(--rope,52px));width:72px;height:57px;transform:translateX(-50%);transition:top .8s ease}
.clj-claw:before{content:'';position:absolute;top:0;left:24px;width:24px;height:15px;border-radius:5px;background:#d8bd6c;border:2px solid #fff0ba}
.clj-arm{position:absolute;top:12px;width:29px;height:42px;border:5px solid #d8dce0;border-top:0;border-radius:0 0 19px 19px;transition:transform .35s}
.clj-arm.left{left:2px;transform:rotate(-24deg)}
.clj-arm.right{right:2px;transform:rotate(24deg)}
.clj.closed .clj-arm.left{transform:rotate(13deg)}
.clj.closed .clj-arm.right{transform:rotate(-13deg)}
.clj-plushies{position:absolute;bottom:45px;left:4%;width:92%;height:42%;display:flex;align-items:end;justify-content:space-around;gap:2px;pointer-events:none}
.clj-plushies span{font-size:clamp(34px,10vw,65px);filter:drop-shadow(0 8px 3px #0008);line-height:1.15}
.clj-floor{position:absolute;bottom:0;width:100%;height:48px;background:linear-gradient(#dfb65c,#8b6420);border-top:4px solid #fff0ae}
.clj-held{position:absolute;top:calc(72px + var(--rope,52px));left:50%;transform:translateX(-50%);font-size:clamp(40px,11vw,65px);line-height:1;opacity:0;transition:top .8s ease,transform .7s ease,opacity .15s;filter:drop-shadow(0 8px 6px #0009)}
.clj.held .clj-held{opacity:1}
.clj.drop .clj-held{top:83%;transform:translate(-50%,0) rotate(65deg);opacity:0;transition:top .65s ease-in,transform .65s ease-in,opacity .65s}
.clj-prize{position:absolute;z-index:12;top:42px;left:4%;width:92%;padding:10px 5px;border-radius:12px;background:#073b32f2;border:2px solid #ffe39b;color:#ffe39b;font-size:clamp(14px,4vw,23px);font-weight:900;display:none;overflow-wrap:anywhere;box-shadow:0 0 23px #ffdc73}
.clj-msg{margin:10px auto;min-height:28px;font-size:13px;font-weight:800;color:#ffde92}
.clj-controls{display:flex;flex-wrap:wrap;justify-content:center;gap:9px}
.clj button{border:2px solid #e9c576;border-radius:13px;background:linear-gradient(#248264,#074733);color:white;font:900 14px Montserrat,Arial,sans-serif;padding:12px 15px;min-height:46px;cursor:pointer;touch-action:manipulation}
.clj button:disabled{opacity:.4;cursor:default}
.clj button[data-grab]{background:linear-gradient(#f9dd8b,#a97a22);color:#17372b}
.clj-result{margin-top:10px;padding:12px;border-radius:13px;background:#ffffff14;border:1px solid #caa54b;display:none;overflow-wrap:anywhere}
.clj-result strong{display:block;color:#ffe39b;font-size:19px;margin:6px}
.clj-summary{display:none;margin-top:12px;padding:12px;border:1px solid #d2ac58;border-radius:12px}
.clj-summary div{padding:6px;border-bottom:1px solid #ffffff24}
@media(prefers-reduced-motion:reduce){.clj *{transition-duration:.01ms!important;animation-duration:.01ms!important}}
`;
 document.head.appendChild(s);
}

function scan(){
 document.querySelectorAll('[x-data^="potDropGame_"]').forEach(widget=>{
 if(widget.dataset[FLAG]||!correctTitle(widget)||!window.Alpine?.$data)return;
 let game;
 try{game=window.Alpine.$data(widget)}catch(e){return}
 if(!game||!Array.isArray(game.pots)||!game.pots.length||typeof game.completeGame!=='function')return;

 const id=(widget.getAttribute('x-data')||'').split('_').pop();
 const arena=document.getElementById('pot-container_'+id)||widget.querySelector('[id^="pot-container_"]');
 if(!arena)return;

 widget.dataset[FLAG]='1';
 styles();

 const pots=game.pots.slice();
 let index=0,busy=false,finished=false,muted=false,position=50,timers=[],wins=[];
 const later=(fn,ms)=>{const t=setTimeout(fn,ms);timers.push(t)};
 const clear=()=>{timers.forEach(clearTimeout);timers=[]};

 widget.querySelectorAll('button').forEach(btn=>{
  if((btn.textContent||'').trim()!=='Start Game')return;
  let p=btn.parentElement;
  while(p&&p!==widget){
   if(p.textContent.includes('Pot Drop Game')&&p.textContent.includes('Drop Speed')){
    p.style.display='none';break;
   }
   p=p.parentElement;
  }
 });

 [...arena.children].forEach(el=>el.style.display='none');
 Object.assign(arena.style,{
  height:'auto',minHeight:'0',overflow:'visible',
  opacity:'1',filter:'none',pointerEvents:'auto'
 });

 const app=document.createElement('div');
 app.className='clj';
 app.innerHTML=`
 <small>✦ COCOLOCO COMPS ✦</small>
 <h2>🧸 Grab A Jelly 🧸</h2>
 <small data-count></small>
 <div class="clj-machine">
  <div class="clj-rail"></div>
  <div class="clj-carriage" data-carriage>
   <div class="clj-rope"></div>
   <div class="clj-claw">
    <i class="clj-arm left"></i>
    <i class="clj-arm right"></i>
   </div>
   <div class="clj-held" data-held>🧸</div>
  </div>
  <div class="clj-plushies">
   <span>🧸</span><span>🐻</span><span>🐰</span><span>🐼</span><span>🧸</span>
  </div>
  <div class="clj-prize" data-prize aria-live="polite"></div>
  <div class="clj-floor"></div>
 </div>
 <div class="clj-msg" data-msg aria-live="polite">
 Move the claw, then press GRAB!
 </div>
 <div class="clj-controls">
  <button type="button" data-left aria-label="Move left">◀ LEFT</button>
  <button type="button" data-grab>🕹️ GRAB!</button>
  <button type="button" data-right aria-label="Move right">RIGHT ▶</button>
  <button type="button" data-mute aria-pressed="false">🔊 Sound on</button>
  <button type="button" data-skip>⏭ Skip all</button>
 </div>
 <div class="clj-result" data-result aria-live="polite"></div>
 <div class="clj-summary" data-summary>
  <h3>Your Grab a Jelly results</h3>
  <div data-list></div>
 </div>`;
 arena.appendChild(app);

 const $=s=>app.querySelector(s);
 const carriage=$('[data-carriage]');
 const held=$('[data-held]');
 const msg=$('[data-msg]');
 const prizeEl=$('[data-prize]');
 const result=$('[data-result]');

 function sound(type){
  if(muted)return;
  try{
   const Audio=window.AudioContext||window.webkitAudioContext;
   if(!Audio)return;
   const ctx=window.__clJellyAudio||(window.__clJellyAudio=new Audio());
   if(ctx.state==='suspended')ctx.resume();
   const notes=type==='win'?[523,659,784,1046]:
    type==='lose'?[330,220]:
    type==='grab'?[400,500]:[280];
   notes.forEach((freq,i)=>{
    const o=ctx.createOscillator(),g=ctx.createGain(),t=ctx.currentTime+i*.11;
    o.type='triangle';
    o.frequency.setValueAtTime(freq,t);
    g.gain.setValueAtTime(.0001,t);
    g.gain.exponentialRampToValueAtTime(.055,t+.015);
    g.gain.exponentialRampToValueAtTime(.0001,t+.16);
    o.connect(g);g.connect(ctx.destination);
    o.start(t);o.stop(t+.18);
   });
  }catch(e){}
 }

 function buttons(disabled){
  ['[data-left]','[data-right]','[data-grab]'].forEach(s=>$(s).disabled=disabled);
 }
 function count(){
  $('[data-count]').textContent=(pots.length-index)+' ticket'+(pots.length-index===1?'':'s')+' remaining';
 }
 function register(p){
  const won=!!p.won;
  if(won)wins.push({ticket:p.ticket??'?',prize:String(p.prize||'Prize')});
  game.currentIndex=Math.min(pots.length,Number(game.currentIndex||0)+1);
  game.processedPots=Number(game.processedPots||0)+1;
  if(won)game.revealedWins=Number(game.revealedWins||0)+1;
 }
 function finish(){
  if(finished)return;
  finished=true;busy=false;clear();buttons(true);
  $('[data-skip]').disabled=true;
  msg.textContent='🧸 All tickets revealed!';
  $('[data-list]').innerHTML=wins.length?
   wins.map(w=>`<div>Ticket #${esc(w.ticket)} • ${esc(w.prize)}</div>`).join(''):
   '<div>No instant wins this time. Check the competition terms for main-draw eligibility. 💚</div>';
  $('[data-summary]').style.display='block';
  try{
   if(Array.isArray(game.activePots))game.activePots.length=0;
   game.currentIndex=pots.length;
   game.processedPots=pots.length;
   later(()=>{
    try{game.completeGame()}
    catch(e){console.error('🧸 Completion error',e)}
   },150);
  }catch(e){console.error('🧸 State error',e)}
 }
 function reset(){
  app.classList.remove('closed','held','drop');
  carriage.style.setProperty('--rope','52px');
  held.textContent='🧸';
  prizeEl.style.display='none';
  prizeEl.textContent='';
  result.style.display='none';
  result.innerHTML='';
 }
 function grab(){
  if(finished||busy||index>=pots.length)return;
  const p=pots[index];if(!p)return;
  busy=true;buttons(true);reset();
  sound('grab');
  msg.textContent='🕹️ Claw dropping…';
  carriage.style.setProperty('--rope','155px');
  later(()=>{
   app.classList.add('closed','held');
   msg.textContent='🧸 Got one!';
   held.textContent=['🧸','🐻','🐰','🐼'][Math.min(3,Math.floor((position-8)/22))]||'🧸';
   sound('move');
   later(()=>{
    carriage.style.setProperty('--rope','52px');
    msg.textContent='Lifting your plushie…';
    later(()=>{
     const won=!!p.won,ticket=p.ticket??'?',prize=String(p.prize||'Prize');
     if(won){
      sound('win');
      prizeEl.textContent='✨ '+prize+' ✨';
      prizeEl.style.display='block';
      msg.textContent='🎉 YOU GRABBED A WIN!';
      result.innerHTML=`<strong>WINNER! 🧸</strong>Ticket #${esc(ticket)}<strong>${esc(prize)}</strong>`;
     }else{
      sound('lose');
      app.classList.add('drop');
      msg.textContent='💚 The plushie slipped!';
      result.innerHTML=`<strong>No instant win this time</strong>Ticket #${esc(ticket)}<br><small>Check the competition terms for main-draw eligibility.</small>`;
     }
     result.style.display='block';
     register(p);index++;count();busy=false;
     if(index>=pots.length){
      later(finish,1800);
     }else{
      later(()=>{
       if(finished)return;
       reset();buttons(false);
       msg.textContent='Move the claw, then press GRAB again!';
      },won?1700:1100);
     }
    },900);
   },480);
  },850);
 }
 function move(delta){
  if(busy||finished)return;
  position=Math.max(10,Math.min(90,position+delta));
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
  clear();
  while(index<pots.length){register(pots[index]);index++}
  count();finish();
 });
 count();
 console.log('🧸 Grab a Jelly V1 ready',pots.length,'tickets');
 });
}

function boot(){
 scan();
 [400,1000,2000,3500].forEach(ms=>setTimeout(scan,ms));
 let t;
 new MutationObserver(()=>{
  clearTimeout(t);
  t=setTimeout(scan,120);
 }).observe(document.body,{childList:true,subtree:true});
}
if(document.readyState==='loading'){
 document.addEventListener('DOMContentLoaded',boot);
}else boot();
document.addEventListener('livewire:navigated',scan);
})();

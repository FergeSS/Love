// Измени эти фразы, чтобы сделать подарок ещё личнее.
const compliments = [
'У тебя удивительный талант — делать обычные моменты самыми любимыми.',
'Твоя улыбка — маленькая причина, по которой я люблю этот большой мир.',
'Рядом с тобой можно просто быть собой. И это бесценно.',
'Ты красивая не только на фотографиях. Ты красивая в каждом своём движении, слове и поступке.',
'Если бы уют был человеком, он был бы очень похож на тебя.',
'Мне нравится, как загораются твои глаза, когда ты рассказываешь о том, что любишь.',
'Ты — та самая мысль, от которой я невольно улыбаюсь посреди дня.',
'В тебе столько нежности, что её хватило бы согреть целую вселенную.',
'Мне хочется узнавать тебя снова и снова. Даже в мелочах.',
'Ты заслуживаешь любви, которая не заставляет сомневаться в себе.',
'Мой любимый план на вечер — быть поближе к тебе.',
'Спасибо, что ты именно такая. Настоящая. Живая. Любимая.'
];
let index = 0;
const quote = document.querySelector('#quote');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
function hearts(x, y) {
 if (reducedMotion.matches) return;
 for (let i = 0; i < 9; i++) {
  const el = document.createElement('span'); el.className = 'burst'; el.textContent = '♡';
  el.style.cssText = `left:${x}px;top:${y}px;font-size:${14 + Math.random()*16}px;--x:${(Math.random()-.5)*230}px;--y:${-60-Math.random()*150}px`;
  document.body.append(el); setTimeout(() => el.remove(), 1400);
 }
}
document.querySelector('#next').addEventListener('click', (event) => {
 index = (index + 1) % compliments.length; quote.textContent = compliments[index];
 document.querySelector('#count').textContent = String(index + 1).padStart(2, '0');
 quote.classList.remove('fade'); void quote.offsetWidth; quote.classList.add('fade');
 const rect = event.currentTarget.getBoundingClientRect(); hearts(rect.x + rect.width/2, rect.y);
});
const letter = document.querySelector('#letter');
document.querySelector('#letter-open').addEventListener('click', () => letter.showModal());
document.querySelector('#letter-close').addEventListener('click', () => letter.close());
letter.addEventListener('click', e => { if(e.target === letter) { const r=letter.getBoundingClientRect(); if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom) letter.close(); } });
// Тихая мелодия создаётся в браузере; внешние аудиофайлы не нужны.
let audio, timer, playing = false, noteIndex = 0;
const notes = [261.63,329.63,392,523.25,440,392,329.63,293.66];
const sound = document.querySelector('#sound');
function playNote() {
 const oscillator=audio.createOscillator(), gain=audio.createGain();
 oscillator.type='sine'; oscillator.frequency.value=notes[noteIndex++ % notes.length];
 gain.gain.setValueAtTime(0,audio.currentTime); gain.gain.linearRampToValueAtTime(.055,audio.currentTime+.08); gain.gain.exponentialRampToValueAtTime(.001,audio.currentTime+1.8);
 oscillator.connect(gain);gain.connect(audio.destination);oscillator.start();oscillator.stop(audio.currentTime+2);
}
sound.addEventListener('click', async () => {
 try {
  if(!audio) audio=new (window.AudioContext||window.webkitAudioContext)();
  if(playing){clearInterval(timer);await audio.suspend();playing=false;}else{await audio.resume();playNote();timer=setInterval(playNote,650);playing=true;}
  sound.setAttribute('aria-pressed',String(playing));sound.setAttribute('aria-label',playing?'Выключить музыку':'Включить музыку');sound.querySelector('span').textContent=playing?'звук включён':'звук выключен';
 } catch { sound.querySelector('span').textContent='звук недоступен'; }
});

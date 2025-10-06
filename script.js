/* Navigation */
function showScreen(id){
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

/* Floating Hearts */
setInterval(() => {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = 10 + Math.random() * 20 + 'px';
    heart.textContent = '💖';
    document.getElementById('floatingHearts').appendChild(heart);
    setTimeout(()=>heart.remove(), 5000);
}, 300);

/* Letter Animation */
const envelope = document.getElementById('envelope');
const letterCard = document.getElementById('letterCard');

function openLetter(){
    envelope.style.display = 'none';
    letterCard.classList.remove('hidden');
    setTimeout(()=>letterCard.classList.add('show'), 50);
}

function resetLetter(){
    letterCard.classList.remove('show');
    setTimeout(()=>{
        letterCard.classList.add('hidden');
        envelope.style.display = 'flex';
    },600);
}

/* Spin Wheel Game */
const wheel = document.getElementById('wheel');
const ctx = wheel.getContext('2d');
const segments = [
    '😍 I love you!',
    '😏 Kiss me 💋',
    '🥰 Hug me tightly',
    '😉 Say something naughty',
    '💌 Send a love note',
    '💖 Dance together',
    '🌹 Compliment me',
    '💋 Surprise me!'
];
const colors = ['#ff4081','#ff69b4','#ffcc00','#1e90ff','#9b59b6','#ff7f50','#ffb6c1','#ff1493'];
let spinning = false;

function drawWheel(){
    const len = segments.length;
    const arc = 2 * Math.PI / len;
    for(let i=0;i<len;i++){
        ctx.beginPath();
        ctx.moveTo(150,150);
        ctx.arc(150,150,150, i*arc, (i+1)*arc);
        ctx.fillStyle = colors[i];
        ctx.fill();
        ctx.save();
        ctx.translate(150,150);
        ctx.rotate((i+0.5)*arc);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 14px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(segments[i],140,0);
        ctx.restore();
    }
}
drawWheel();

function spinWheel(){
    if(spinning) return;
    spinning = true;
    let spinAngle = Math.random()*5000 + 5000;
    let currentAngle = 0;
    const spinInterval = setInterval(()=>{
        currentAngle += spinAngle/60;
        spinAngle *= 0.94;
        wheel.style.transform = `rotate(${currentAngle}deg)`;
        if(spinAngle<0.5){
            clearInterval(spinInterval);
            spinning=false;
            showSpinResult(currentAngle);
        }
    },50);
}

function showSpinResult(angle){
    const arc = 360/segments.length;
    const index = Math.floor(((360 - (angle % 360)) / arc)) % segments.length;
    document.getElementById('spinMessage').textContent = segments[index];
}

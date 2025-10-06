// SCREEN SWITCHING
function showScreen(id){
    document.querySelectorAll('.screen').forEach(screen=>{
        screen.classList.remove('active');
    });
    document.getElementById(id).classList.add('active');
}

// FRONT PAGE HEARTS
const heartsContainer = document.getElementById('heartsContainer');
function createHeart(){
    const heart = document.createElement('div');
    heart.className='heart';
    heart.style.left=Math.random()*100+'%';
    heart.style.fontSize=(20+Math.random()*30)+'px';
    heart.textContent='💖';
    heart.style.animationDuration=(5+Math.random()*5)+'s';
    heartsContainer.appendChild(heart);
    setTimeout(()=>heart.remove(),10000);
}
setInterval(createHeart,300);

// LETTER ANIMATION
function openLetter(){
    document.querySelector('.envelope').style.display='none';
    document.getElementById('letterContent').style.display='block';
}
function closeLetter(){
    document.querySelector('.envelope').style.display='block';
    document.getElementById('letterContent').style.display='none';
}

// SIMPLE MEMORY GAME
const gameBoard=document.getElementById('gameBoard');
let cards=[];

function createGame(){
    const symbols=['🍎','🍌','🍇','🍉','🍎','🍌','🍇','🍉'];
    cards=[];
    symbols.sort(()=>0.5-Math.random());
    gameBoard.innerHTML='';
    symbols.forEach(symbol=>{
        const card=document.createElement('div');
        card.className='game-card';
        card.textContent='';
        card.dataset.symbol=symbol;
        card.addEventListener('click',flipCard);
        gameBoard.appendChild(card);
        cards.push(card);
    });
}
let flipped=[];
function flipCard(){
    if(this.textContent || flipped.length===2) return;
    this.textContent=this.dataset.symbol;
    flipped.push(this);
    if(flipped.length===2){
        setTimeout(checkMatch,500);
    }
}
function checkMatch(){
    if(flipped[0].dataset.symbol===flipped[1].dataset.symbol){
        flipped.forEach(c=>c.style.visibility='hidden');
    }else{
        flipped.forEach(c=>c.textContent='');
    }
    flipped=[];
}

// INITIALIZE GAME WHEN SCREEN OPENS
document.querySelector('button[onclick*="game"]').addEventListener('click',createGame);

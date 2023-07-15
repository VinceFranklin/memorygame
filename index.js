const cards = document.querySelectorAll('.mc');
var timer=document.querySelector('.Timer');
var score=document.querySelector('.Score');
var pause=document.querySelector('.pause-button');
var highscoreelement = document.querySelector(".high-score");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
var count=0;
let isPaused=true;
let v=0;


let highScore=localStorage.getItem(".high-score") || 0;
highscoreelement.textContent="HIGHSCORE:" + highScore;


function flipCard() {
    var sound1=new Audio("sounds/Card-flip-sound-effect.mp3")
    sound1.play();
  if (lockBoard) return;
  if (this === firstCard) return;
    if(isPaused && t>0){
  this.classList.add('flip');
    }

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}
score.textContent="SCORE: "+count;
function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  if(isMatch && firstCard.dataset.framework=== "card2"){
    console.log("hi");
    count=count+5;

  }
  if(isMatch && firstCard.dataset.framework=== "card5"){
    console.log("hi");
    t=t+5;
  }
    // console.log(firstCard.dataset.framework)
  isMatch ? disableCards() : unflipCards();
  if(isMatch){
    var sound2= new Audio("sounds/mixkit-instant-win-2021.wav");
    sound2.play();
    count=count+1;
    v=v+1;
    if(v===8){
        alert("GAME OVER BTW SCORE IS "+count);
        var sound3=new Audio("sounds/mixkit-ethereal-fairy-win-sound-2019.wav");
        sound3.play();
      }
    score.textContent="SCORE: "+count;
    return count;
  }
 

}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}
(function shuffle() {
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 16);
      card.style.order = randomPos;
    });
  })();



var t=60

function time(){
    
    if(isPaused){
    t=t-1;
    }
    timer.textContent = "TIMER: "+t;
    if(t===0){
        alert("TIME OUT");
        clearInterval(cop);
    }
    return t;
}


function main(){
    if(isPaused){
    cards.forEach(card => card.addEventListener('click', flipCard));
    }
    console.log(highScore)
    highScore=count >=highScore ?count :highScore;
    localStorage.setItem(".high-score",highScore);
    highscoreelement.textContent="HIGHSCORE:" + highScore;
    window.requestAnimationFrame(main)
}

window.requestAnimationFrame(main);

pause.addEventListener("click",function(){
    isPaused=!isPaused;
})
var cop=setInterval(time,1000);


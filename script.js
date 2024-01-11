let firstCard = null;
let matchCount = 0;
let loadedImages = [];
// let audioClip = new Audio("sample-15s.mp3");
let audioClip = new Audio("bochner_bday_audio.mp3");
function preloadAudio() {
  audioClip.preload = "auto";
  audioClip.load();
}

preloadAudio();


// Card class definition
class Card {
    constructor(frontImage, backImage, type) {
        this.frontImage = frontImage;
        this.backImage = backImage;
        this.type = type;
        this.isFlipped = false;
    }

    flip() {
        this.isFlipped = !this.isFlipped;
    }
}

// Creating ten instances of the Card class
const card1 = new Card("/images/image1.jpg", "/images/ravenclaw_card_back.jpeg",1);
const card2 = new Card("/images/image2.jpg", "/images/ravenclaw_card_back.jpeg",2);
const card3 = new Card("/images/image3.jpg", "/images/ravenclaw_card_back.jpeg",3);
const card4 = new Card("/images/image4.jpg", "/images/ravenclaw_card_back.jpeg",4);
const card5 = new Card("/images/image5.jpg", "/images/ravenclaw_card_back.jpeg",5);
const card6 = new Card("/images/image1.jpg", "/images/ravenclaw_card_back.jpeg",1);
const card7 = new Card("/images/image2.jpg", "/images/ravenclaw_card_back.jpeg",2);
const card8 = new Card("/images/image3.jpg", "/images/ravenclaw_card_back.jpeg",3);
const card9 = new Card("/images/image4.jpg", "/images/ravenclaw_card_back.jpeg",4);
const card10 = new Card("/images/image5.jpg", "/images/ravenclaw_card_back.jpeg",5);

// Append cards to document
let cardElems = [];
cardElems.push(createCardElement(card1)); 
cardElems.push(createCardElement(card2));
cardElems.push(createCardElement(card3));
cardElems.push(createCardElement(card4));
cardElems.push(createCardElement(card5));
cardElems.push(createCardElement(card6)); 
cardElems.push(createCardElement(card7));
cardElems.push(createCardElement(card8));
cardElems.push(createCardElement(card9));
cardElems.push(createCardElement(card10));

shuffle(cardElems);

cardElems.forEach(elem => document.body.appendChild(elem));

// Card element creator
function createCardElement(card) {
  let elem = document.createElement('div');
  let inner = document.createElement('div');
  inner.style.backgroundImage = `url(${card.backImage})`;
 inner.dataset.type = card.type;
 inner.style.backgroundSize = 'contain';
  inner.style.backgroundRepeat="no-repeat";
 inner.style.position = 'absolute'; 
  

  elem.appendChild(inner);

  function whatToDoOnClick(){
    if(!card.isFlipped){
      card.flip();

      inner.style.backgroundImage = `url(${card.frontImage})`;

      if(!firstCard){
        firstCard = card;
        firstElement = this;
      } else {
        if(firstCard.type == card.type){
          // cards match, do nothing
          matchCount++;
          if (matchCount == 5){
            finalTimeout = setTimeout(endGame, 750);
          }
          firstCard = null;  
        } else {
          // cards don't match
          setTimeout(() => {
            card.flip();
            inner.style.backgroundImage = `url(${card.backImage})`;

            firstCard.flip();
            firstElement.style.backgroundImage = `url(${firstCard.backImage})`;

            firstCard = null;
          }, 1750);
        }
      }
    }

  }
  // Add click handler  
  inner.addEventListener('click', whatToDoOnClick);

  return elem;
}
/* helper function. should be part of javascript */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
/* 

*/
function endGame(){

    let video = document.createElement("video");
    video.style.position = "absolute";
    video.style.top = 0;
    video.style.left = 0;
    video.style.height = "100%"; 
    video.style.width = "100%";
    video.style.zIndex = 100; // Show on top

    video.autoplay = true;
    video.loop = false;

    let source = document.createElement("source");
    source.src = "bochner_bday_video.mp4";
    source.type = "video/mp4";

    video.appendChild(source);  
    document.body.appendChild(video);

  }
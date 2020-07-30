const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');


//keep track of current card
let currentActiveCard = 0;

//Store DOM cards
const cardsEl = [];

const cardsData = getCardsData();

//Store Card Data (starting with hard coded object array then comment out)
// const cardsData = [
//   {
//     question: 'What must a variable begin with',
//     answer: 'A letter, $ or _'
//   },
//   {
//     question: 'What is a variable',
//     answer: 'A Container for a piece of data'
//   },
//   {
//     question: 'Example of Case Sensitive Variable',
//     answer: 'thisIsAVariable'
//   }
// ];

//Create all cards
function createCards(){
   cardsData.forEach((data, index) => createCard(data, index));
}

//Create single card in the DOM
function createCard(data, index){
  const card = document.createElement('div');
  card.classList.add('card');

  if(index === 0 ){
    card.classList.add('active');
  }

  card.innerHTML = `
  <div class="inner-card">
        <div class="inner-card-front">
          <p>${data.question}</p>
        </div>
        <div class="inner-card-back">
          <p>${data.answer}</p>
        </div>
      </div>
  `;

  card.addEventListener('click', () => card.classList.toggle
    ('show-answer'));

  //Add to DOM cards
  cardsEl.push(card);

  cardsContainer.appendChild(card);

  updateCurrentText();
}


//Show number of cards
function updateCurrentText(){
  currentEl.innerText = `
  ${currentActiveCard + 1} / ${cardsEl.length} 
  `;
}

//Get cards from local storage 
//Note: to retrieve data from local storage 
// - restore it to an array form with JSON.parse 
//(to put in local storage it must be turned into a string
//with JSON.stringify)
function getCardsData(){
  const cards = JSON.parse(localStorage.getItem('cards'));
  return cards === null ? [] : cards;
}

//Add card to local storage
function setCardsData(cards){
  localStorage.setItem('cards', JSON.stringify(cards));
  window.location.reload();
}


createCards();

//Event Listeners
//Next Button
nextBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card left';

  currentActiveCard = currentActiveCard +1;

  if(currentActiveCard > cardsEl.length -1){
    currentActiveCard = cardsEl.length -1;
  }
  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentText();
});

//Prevous Button
prevBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card right';

  currentActiveCard = currentActiveCard - 1;

  if(currentActiveCard < 0){
    currentActiveCard = 0;
  }
  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentText();
});

//Show add container
showBtn.addEventListener('click', () => addContainer.classList.add('show'));

//Hide add container
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

//Add new card
addCardBtn.addEventListener('click', () => {
  const question = questionEl.value;
  const answer = answerEl.value;
  
  if(question.trim() && answer.trim()){
    const newCard = {question, answer};

    //maybe add an alert if the conditions are not satisfied

    createCard(newCard);

    questionEl.value = '';
    answerEl.value = '';

    addContainer.classList.remove('show');

    cardsData.push(newCard);
    setCardsData(cardsData);
  }
});

//Clear ALL cards button (note: add functionality to remove individual cards 
//this function removes all cards in local storage)
clearBtn.addEventListener('click', () => {
  localStorage.clear();
  cardsContainer.innerHTML = '';
  window.location.reload();
});

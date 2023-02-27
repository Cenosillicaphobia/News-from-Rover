import '../css/styles.css'
const axios = require('axios');

// API

const NEWS_API = 'https://hacker-news.firebaseio.com/v0/newstories.json'
const NEWS_LINK = 'https://hacker-news.firebaseio.com/v0/item/'

// Variabili

let startId = 0
let endId = 10

// Elementi DOM

let moreNewsButton = document.querySelector('.load-more');

//Funzioni pagina

window.onload = getNews();

moreNewsButton.addEventListener('click', getMoreNews);

//Funzione per accedere alle prime dieci notizie

async function getNews(){
  try{
    let newsIdArray = [];

    let response = await axios.get(NEWS_API);
    newsIdArray = response;

    for (let i = startId; i < endId; i++) { 
      let newsUrl = NEWS_LINK + newsIdArray[i] + '.json';
      let newsresponse = await axios.get(newsUrl);
      let newsData = newsresponse;

      createCard(newsData.title, newsData.url, newsData.time);
    };
  } catch (e) { alert("We can't get signals from the rover, check back later! " + e.message)};
};

// funzione per accedere alle notizie successive

function getMoreNews(){
  let startId =+ 10; 
  let endId =+ 10;

  if(endId == 500){ alert('wow, you really are a Marsian reader. You have viewed all available news. Come back later!')}
  else { getNews() }
};

// Funzione per creare le cards

function createCard(newsTitle, newsLink, newsDate){

let newsCard = document.createElement('div');
newsCard.setAttribute('class', 'card-container');
document.querySelector('.news').appendChild(newsCard);

let cardTitle = document.createElement('h2');
cardTitle.setAttribute('class', 'card-title');
cardTitle.innerHTML = newsTitle;
document.querySelector('.card-container').appendChild(cardTitle);

let cardDate = document.createElement('p');
cardDate.setAttribute('class', 'card-date');
cardDate.innerHTML = dataConverter (newsDate);
document.querySelector('.card-container').appendChild(cardDate);

let cardLink = document.createElement('a');
cardLink.setAttribute('class', 'card-link');
cardLink.setAttribute('href', newsLink);
cardLink.innerHTML = 'Read More';
document.querySelector('.card-container').appendChild(cardLink);

};

// Funzione per convertire la data

function dataConverter(nDate){
  let dateMilliseconds = nDate * 1000;
  let dateObject = new Date(dateMilliseconds);
  let options = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: false,
    hour12: false,
  };
  let date = dateObject.toLocaleString(options).split(',').join('');
  return date;
};
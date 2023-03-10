import '../css/styles.css'
const axios = require('axios');
const lodash = require('lodash');


// API

const NEWS_API = process.env.NEWS_API
const NEWS_LINK = process.env.NEWS_LINK

// Variabili

let startId = 0
let endId = 10

// Elementi DOM

let moreNewsButton = document.querySelector('.load-more');
let loader = document.querySelector('.loader');

//Funzioni pagina

window.onload = getNews();

window.onload = loading();

moreNewsButton.addEventListener('click', getMoreNews);

//Funzione loading

function loading() {setTimeout(() => loader.setAttribute('class', 'loader-hidden'),5000)};

//Funzione per accedere alle prime dieci notizie

async function getNews(){
  
  try{
    let newsIdArray = [];

    let response = await axios.get(NEWS_API);
    newsIdArray = await response.data;

    for (let i = startId; i < endId; i++) { 
      let newsUrl = NEWS_LINK + newsIdArray[i] + '.json';
      let newsresponse = await axios.get(newsUrl);
      let newsData = await newsresponse.data;

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
  let dateMilliseconds = _.multiply(nDate, 1000)
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
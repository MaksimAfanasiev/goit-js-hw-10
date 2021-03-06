import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
const axios = require('axios');

const formEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const moreBtn = document.querySelector('.load-more');

// BackEnd

// Variables for HTTP-request

const URL = 'https://pixabay.com/api/';
const API_KEY = '27715674-92925a6f691a5283ca5f8bc26';
let q = '';
const image_type = 'photo';
const orientation = 'horizontal';
const safesearch = 'true';
let page = 1;
const per_page = 40;
let totalPages = 0;

function pathMaker() {
  return `${URL}?key=${API_KEY}&q=${q}&image_type=${image_type}&orientation=${orientation}&safesearch=${safesearch}&page=${page}&per_page=${per_page}`;
}

// const PATH = `${URL}?key=${API_KEY}&q=${q}&image_type=${image_type}&orientation=${orientation}&safesearch=${safesearch}&page=${page}&per_page=${per_page}`;

// -------------------------------

formEl.addEventListener('submit', onSubmitForm);
moreBtn.addEventListener('click', onMoreBtnClick);

console.log('hello');

function onSubmitForm(e) {
  e.preventDefault();
  page = 1;
  q = e.target.searchQuery.value;
  galleryEl.innerHTML = '';

  const PATH = !q.trim() ? '' : pathMaker();

  request(PATH)
    .then(data => {
      console.log(data);
      totalPages = data.totalHits;
      makeMarkupGallery(data.hits);
    })
    .catch(error => console.log(error));
}

function onMoreBtnClick() {
  page += 1;
  const PATH = !q.trim() ? '' : pathMaker(q, page);

  request(PATH)
    .then(data => {
      makeMarkupGallery(data.hits);
    })
    .catch(error => console.log(error));

  if (page === totalPages) {
    console.log('Hide a button Load_more');
    alert("We're sorry, but you've reached the end of search results.");
  }
}

// Request

function request(url) {
  if (!url) {
    alert('Search field can not be empthy!');
  } else {
    return axios
      .get(url)
      .then(response => {
        if (response.data.hits.length === 0) {
          alert(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          throw new Error();
        } else {
          return response.data;
        }
      })
      .catch(error => error);
  }
}

// Markup

function makeMarkupGallery(array) {
  const galleryMarkup = array
    .map(img => {
      const smallImg = img.webformatURL;
      const largeImg = img.largeImageURL;
      const alt = img.tags;
      const likes = img.likes;
      const views = img.views;
      const comments = img.comments;
      const downloads = img.downloads;

      return `
        <div class="photo-card">
        <img src=${smallImg} alt=${alt} loading="lazy" />
        <div class="info">
            <p class="info-item">
            <b>Likes ${likes}</b>
            </p>
            <p class="info-item">
            <b>Views ${views}</b>
            </p>
            <p class="info-item">
            <b>Comments ${comments}</b>
            </p>
            <p class="info-item">
            <b>Downloads ${downloads}</b>
            </p>
        </div>
        </div>`;
    })
    .join(',');

  galleryEl.insertAdjacentHTML('beforeend', galleryMarkup);
}

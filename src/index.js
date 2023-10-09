
// ----------------
import axios from "axios";
import Notiflix from 'notiflix';
import { getImages } from './api';


const form = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector(".load-more");
const gallery = document.querySelector('.gallery');
const input = document.querySelector('input[name="searchQuery"]');
let currentPage = 1;
loadMoreBtn.style.display = 'none'

form.addEventListener('submit', handleFormSubmit);


function createMarkup(images) {
  images.forEach(image => {
    const card = document.createElement('div');
    card.innerHTML = `
      <div class="photo-card">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
        <div class="info">
          <p class="info-item"><b>Likes:</b> ${image.likes}</p>
          <p class="info-item"><b>Views:</b> ${image.views}</p>
          <p class="info-item"><b>Comments:</b> ${image.comments}</p>
          <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
        </div>
      </div>
    `;

    gallery.appendChild(card);
  });
}


loadMoreBtn.addEventListener('click', loadMoreImages);

async function loadMoreImages() {
  currentPage++;
  const searchQuery = input.value.trim();

  try {
    const data = await getImages(searchQuery, currentPage);

    if (data.hits.length === 0) {
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      loadMoreBtn.style.display = 'none';
    } else {
      createMarkup(data.hits);
    }
  } catch (error) {
    console.error(error);
  }
}


async function handleFormSubmit(evt) {
  evt.preventDefault();
  gallery.innerHTML = '';
  currentPage = 1;
  const searchQuery = input.value;

  try {
    const data = await getImages(searchQuery);

    if (data.hits.length === 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } else {
      createMarkup(data.hits);
      loadMoreBtn.style.display = 'block';
    }
  } catch (error) {
    console.error(error);
  }
}
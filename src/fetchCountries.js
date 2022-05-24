import Notiflix from 'notiflix';

const requestFields = ['name', 'capital', 'population', 'flags', 'languages'];

export function fetchCountries(request) {
  const URL = `https://restcountries.com/v3.1/name/${request}?fields=${requestFields.join(',')}`;

  return fetch(URL)
    .then(response => {
      if (!response.ok) {
        throw new Error();
      } else {
        return response.json();
      }
    })
    .then(data => data)
    .catch(error => error);
}

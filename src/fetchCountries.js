const requestFields = ['name', 'capital', 'population', 'flags', 'languages'];

export function fetchCountries(name) {
  const URL = `https://restcountries.com/v3.1/name/${name}?fields=${requestFields.join(',')}`;

  fetch(URL)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
}

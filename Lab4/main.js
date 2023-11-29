const locationsDropdown = document.getElementById('locations');
const outputLabel = document.getElementById('output');

locationsDropdown.addEventListener('change', () => {
  const selectedLocation = locationsDropdown.value.split(',');
  const latitude = selectedLocation[0];
  const longitude = selectedLocation[1];

  const url = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Assuming that data.results.sunrise and data.results.sunset are present in the API response
      outputLabel.innerHTML = `Sunrise: ${data.results.sunrise}<br>Sunset: ${data.results.sunset}`;
    })
    .catch(error => {
      outputLabel.innerHTML = `Error: ${error}`;
    });
});
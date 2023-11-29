document.addEventListener('DOMContentLoaded', () => {
    const locationsDropdown = document.getElementById('locations');
    const currentLocationLabel = document.getElementById('currentLocation');
    const outputLabel = document.getElementById('output');
  
    locationsDropdown.addEventListener('change', () => {
      const selectedLocation = locationsDropdown.value.split(',');
      const latitude = selectedLocation[0];
      const longitude = selectedLocation[1];
  
      currentLocationLabel.innerHTML = `Current Location: ${locationsDropdown.options[locationsDropdown.selectedIndex].text}`;
      const url = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date=today`; // For today's data
  
      fetchSunriseSunset(url);
    });
  
    function getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
  
          currentLocationLabel.innerHTML = `Current Location: Your Location`;
          const url = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date=today`; // For today's data
  
          fetchSunriseSunset(url);
        }, error => {
          outputLabel.innerHTML = `Error getting location: ${error.message}`;
        });
      } else {
        outputLabel.innerHTML = "Geolocation is not supported by this browser.";
      }
    }
  
    function fetchSunriseSunset(url) {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const results = data.results;
          const timezone = data.timezone;
  
          outputLabel.innerHTML = `
            Today:
            <br>Sunrise: ${results.sunrise}
            <br>Sunset: ${results.sunset}
            <br>Civil Dawn: ${results.civil_twilight_begin}
            <br>Civil Dusk: ${results.civil_twilight_end}
            <br>Day Length: ${results.day_length}
            <br>Solar Noon: ${results.solar_noon}
            <br>Time Zone: ${timezone}
          `;
        })
        .catch(error => {
          outputLabel.innerHTML = `Error: ${error}`;
        });
    }
  
    getUserLocation();
  });
  
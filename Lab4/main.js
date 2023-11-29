async function getSunsetSunrise() {
    const geocodeApiKey = 'YOUR_GEOCODE_API_KEY';
    const sunriseSunsetApiKey = 'YOUR_SUNRISESUNSET_API_KEY';
    const searchInput = document.getElementById('searchInput').value;

    try {
        // Get latitude and longitude from Geocoding API
        const geocodeResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchInput}&key=${geocodeApiKey}`);
        const geocodeData = await geocodeResponse.json();

        const location = geocodeData.results[0].geometry.location;
        const latitude = location.lat;
        const longitude = location.lng;

        // Get sunrise and sunset times from Sunrise-Sunset API
        const sunriseSunsetResponse = await fetch(`https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0&date=today&apiKey=${sunriseSunsetApiKey}`);
        const sunriseSunsetData = await sunriseSunsetResponse.json();

        const sunrise = new Date(sunriseSunsetData.results.sunrise).toLocaleTimeString();
        const sunset = new Date(sunriseSunsetData.results.sunset).toLocaleTimeString();

        const resultElement = document.getElementById('result');
        resultElement.innerHTML = `
            <p>Sunrise: ${sunrise}</p>
            <p>Sunset: ${sunset}</p>
        `;
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error fetching data. Please try again.');
    }
}
//Powered by SunriseSunset.io


document.addEventListener('DOMContentLoaded', () => {
    const locationsDropdown = document.getElementById('locations');
    const currentLocationLabel = document.getElementById('currentLocation');
    const outputSunrise = document.getElementById('outputSunrise');
    const outputSunset = document.getElementById('outputSunset');
    const outputCivilDawn = document.getElementById('outputDawn');
    const outputCivilDusk = document.getElementById('outputDusk');
    const outputDayLength = document.getElementById('outputDayLength');
    const outputSolarNoon = document.getElementById('outputSolarNoon');
    const outputTimeZone = document.getElementById('outputTimeZone');

    const outputTomorrowSunrise = document.getElementById('outputTomorrowSunrise');
    const outputTomorrowSunset = document.getElementById('outputTomorrowSunset');
    const outputTomorrowCivilDawn = document.getElementById('outputTomorrowDawn');
    const outputTomorrowCivilDusk = document.getElementById('outputTomorrowDusk');
    const outputTomorrowDayLength = document.getElementById('outputTomorrowDayLength');
    const outputTomorrowSolarNoon = document.getElementById('outputTomorrowSolarNoon');
    const outputTomorrowTimeZone = document.getElementById('outputTomorrowTimeZone');

    locationsDropdown.addEventListener('change', () => {
        const selectedValue = locationsDropdown.value;
        if (selectedValue === 'current') {
            getUserLocation();
        } else {
            const selectedLocation = selectedValue.split(',');
            const latitude = selectedLocation[0];
            const longitude = selectedLocation[1];

            currentLocationLabel.innerHTML = `Selected Location: ${locationsDropdown.options[locationsDropdown.selectedIndex].text}`;
            const todayUrl = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date=today&formatted=0`;
            const tomorrowUrl = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date=tomorrow&formatted=0`;

            getSunriseSunset(todayUrl, tomorrowUrl);
        }
    });

    function getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                currentLocationLabel.innerHTML = `Selected Location: Your Location`;
                const todayUrl = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date=today&formatted=0`;
                const tomorrowUrl = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date=tomorrow&formatted=0`;

                getSunriseSunset(todayUrl, tomorrowUrl);
            }, error => {
                outputSunrise.innerHTML = `Error getting location: ${error.message}`;
            });
        } else {
            outputSunrise.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    function getSunriseSunset(todayUrl, tomorrowUrl) {
        fetch(todayUrl)
            .then(response => response.json())
            .then(data => {
                const results = data.results;

                outputSunrise.innerHTML = `Sunrise: ${results.sunrise}`;
                outputSunset.innerHTML = `Sunset: ${results.sunset}`;
                outputCivilDawn.innerHTML = `Dawn: ${results.dawn}`;
                outputCivilDusk.innerHTML = `Dusk: ${results.dusk}`;
                outputDayLength.innerHTML = `Day Length: ${results.day_length}`;
                outputSolarNoon.innerHTML = `Solar Noon: ${results.solar_noon}`;
                outputTimeZone.innerHTML = `Time Zone: ${results.timezone}`;
            })
            .catch(error => {
                outputSunrise.innerHTML = `Error: ${error}`;
            });

        fetch(tomorrowUrl)
            .then(response => response.json())
            .then(data => {
                const results = data.results;

                outputTomorrowSunrise.innerHTML = `Tomorrow's Sunrise: ${results.sunrise}`;
                outputTomorrowSunset.innerHTML = `Tomorrow's Sunset: ${results.sunset}`;
                outputTomorrowCivilDawn.innerHTML = `Tomorrow's Dawn: ${results.dawn}`;
                outputTomorrowCivilDusk.innerHTML = `Tomorrow's Dusk: ${results.dusk}`;
                outputTomorrowDayLength.innerHTML = `Tomorrow's Day Length: ${results.day_length}`;
                outputTomorrowSolarNoon.innerHTML = `Tomorrow's Solar Noon: ${results.solar_noon}`;
                outputTomorrowTimeZone.innerHTML = `Tomorrow's Time Zone: ${results.timezone}`;
            })
            .catch(error => {
                outputTomorrowSunrise.innerHTML = `Error: ${error}`;
            });
    }

    locationsDropdown.dispatchEvent(new Event('change'));
});



//Tasks
//Find Some images to make pretty
//Make it look slightly better
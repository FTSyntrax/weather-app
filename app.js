window.addEventListener('load', () => {
    let long;
    let lat;
    let days = 3;
    let aqi = 'no'; // Get air quality data
    let temperatureDescription = document.querySelector('.temperature-description')
    let temperatureDegree = document.querySelector('.temperature-degree')
    let degreeSection = document.querySelector('.degree-section')
    let temperatureDegreeText = document.querySelector('.degree-section span')
    let locationTimezone = document.querySelector('.location-timezone')
    let weatherIcon = document.querySelector('.weather-icon')

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude
            long = position.coords.longitude

            // In case of CORS/localhost usage (must visit the site to temporarily unlock demo access )
            //const proxy = 'https://cors-anywhere.herokuapp.com/';
            //const api = `${proxy}https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${lat},${long}&days=3&aqi=yes&alerts=yes`;
            // End of CORS fix

            const api = `https://api.weatherapi.com/v1/forecast.json?key=49a62e3f2aad48b0b80190936212206&q=${lat},${long}&days=${days}&aqi=${aqi}&alerts=no`;
            fetch(api).then(res => {
                return res.json();
            }).then(data => {
                // Remove Loader
                displayData(data);
            })
            function displayData(data) {
                const {
                    temp_c,
                    temp_f,
                    condition: {
                        icon,
                        text
                    },
                } = data.current;
                // Set DOM Elements from API
                temperatureDegree.textContent = temp_c;
                temperatureDescription.textContent = text;
                locationTimezone.textContent = data.location.tz_id;
                weatherIcon.setAttribute("src", icon);
                weatherIcon.setAttribute("alt", text);

                // Swap between Fahrenheit and Celcius
                degreeSection.addEventListener("click", () => {
                    if (temperatureDegreeText.textContent == "C") {
                        temperatureDegree.textContent = temp_f;
                        temperatureDegreeText.textContent = "F";
                        return;
                    }
                    temperatureDegree.textContent = temp_c;
                    temperatureDegreeText.textContent = "C";
                });
            }
        });
    } else {
        // Handle User Location rejection
    }
})
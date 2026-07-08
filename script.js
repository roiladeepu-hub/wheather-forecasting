const weatherDiv = document.getElementById("weather");
const btn = document.getElementById("weatherBtn");

btn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        weatherDiv.innerHTML = "Geolocation is not supported.";
    }
});

function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const current = data.current;

            weatherDiv.innerHTML = `
                <h2>Your Weather</h2>
                <p>🌡 Temperature: ${current.temperature_2m} °C</p>
                <p>💧 Humidity: ${current.relative_humidity_2m}%</p>
                <p>🌬 Wind Speed: ${current.wind_speed_10m} km/h</p>
            `;
        })
        .catch(() => {
            weatherDiv.innerHTML = "Unable to fetch weather data.";
        });
}

function error() {
    weatherDiv.innerHTML = "Location access denied.";
}
const API_KEY = 'your_api_key_here'; // Replace with your OpenWeatherMap API key
const weatherInfo = document.getElementById('weather-info');
const searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    if (city) {
        fetchWeatherData(city);
    } else {
        alert('Please enter a city name!');
    }
});

async function fetchWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('City not found!');
        }
        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        weatherInfo.innerHTML = `<p>${error.message}</p>`;
    }
}

function displayWeatherData(data) {
    const { name, main: { temp }, weather, timezone } = data;
    const weatherCondition = weather[0].main;
    const currentTime = new Date((new Date().getTime() + timezone * 1000) - new Date().getTimezoneOffset() * 60000)
        .toLocaleTimeString();
    
    weatherInfo.innerHTML = `
        <h2>${name}</h2>
        <p>Temperature: ${temp}°C</p>
        <p>Condition: ${weatherCondition}</p>
        <p>Current Time: ${currentTime}</p>
    `;
    updateBackground(weatherCondition);
}

function updateBackground(condition) {
    const conditionsMap = {
        Clear: '#f7d794',
        Clouds: '#d3d3d3',
        Rain: '#a4b0be',
        Snow: '#dfe4ea',
        Thunderstorm: '#535c68',
    };
    document.body.style.backgroundColor = conditionsMap[condition] || '#f0f0f0';
}

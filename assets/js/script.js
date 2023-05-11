// Weather API base URL:
// api.openweathermap.org/data/2.5/weather?
const currentWeather = 'https://api.openweathermap.org/data/2.5/weather?units=imperial';
const fiveDayForecast = 'https://api.openweathermap.org/data/2.5/forecast?units=imperial';
const geocode = 'http://api.openweathermap.org/geo/1.0/direct?q='
var weatherAPIKey = prompt('Submit OpenWeather API Key:');
var city;
var latitude;
var longitude;


var submitCity = document.querySelector('form');
var cityInput = document.querySelector('#submitCity');
var today = document.querySelector('#today');
var fiveDay = document.querySelector('#fiveDay');

submitCity.addEventListener('submit', async function(event) {
    event.preventDefault();
    city = cityInput.value;
    console.log(city);
    if (city != '') {

        await fetch(geocode + city + '&limit=1&appid=' + weatherAPIKey)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            city = data[0].name;
            latitude = data[0].lat;
            longitude = data[0].lon;
            console.log(data);
        });

        await fetch(currentWeather + '&lat=' + latitude + '&lon=' + longitude + '&appid=' + weatherAPIKey)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            today.children[0].textContent = city + dayjs().format(' (DD/MM/YYYY)');
            today.children[1].src = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png'
            today.children[2].textContent = `Temp: ${data.main.temp}\xb0F`;
            today.children[3].textContent = `Wind: ${data.wind.speed} MPH`;
            today.children[4].textContent = `Humidity: ${data.main.humidity} %`;
        });

        await fetch(fiveDayForecast + '&lat=' + latitude + '&lon=' + longitude + '&appid=' + weatherAPIKey)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            for (var i = 0; i < 5; i++) {
                fiveDay.children[i].children[0].textContent = dayjs().format(' (DD/MM/YYYY)');
                fiveDay.children[i].children[1].src = 'https://openweathermap.org/img/wn/' + data.list[i * 8].weather[0].icon + '@2x.png'
                fiveDay.children[i].children[2].textContent = `Temp: ${data.list[i * 8].main.temp}\xb0F`;
                fiveDay.children[i].children[3].textContent = `Wind: ${data.list[i * 8].wind.speed} MPH`;
                fiveDay.children[i].children[4].textContent = `Humidity: ${data.list[i * 8].main.humidity} %`;
            }
        });
    }
});
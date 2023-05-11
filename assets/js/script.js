// Weather API base URL:
// api.openweathermap.org/data/2.5/weather?
const currentWeather = 'https://api.openweathermap.org/data/2.5/weather?';
const fiveDayForecast = 'https://api.openweathermap.org/data/2.5/forecast?';
const geocode = 'http://api.openweathermap.org/geo/1.0/direct?q='
var weatherAPIKey = prompt('Submit OpenWeather API Key:');
var city;
var temp;
var wind;
var humid;

var submitCity = document.querySelector('form');
var cityInput = document.querySelector('#submitCity')

submitCity.addEventListener('submit', function(event) {
    event.preventDefault();
    city = cityInput.value;
    console.log(city);
    if (city != '') {
        fetch(geocode + city + '&limit=1&appid=' + weatherAPIKey)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });
    }
});

// fetch(currentWeather + 'lat=' + '33.44' + '&lon=' + '-94.04' + '&appid=' + weatherAPIKey)
// .then(function (response) {
//     return response.json();
// })
// .then(function (data) {
//     console.log(data);
// });

// fetch(fiveDayForecast + 'lat=' + '33.44' + '&lon=' + '-94.04' + '&appid=' + weatherAPIKey)
// .then(function (response) {
//     return response.json();
// })
// .then(function (data) {
//     console.log(data);
// });
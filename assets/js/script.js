var search = document.querySelector('aside');
var submitCity = document.querySelector('form');
var cityInput = document.querySelector('#submitCity');
var today = document.querySelector('#today');
var h4 = document.querySelector('h4');
var fiveDay = document.querySelector('#fiveDay');
var clear = document.querySelector('#clear');

const currentWeather = 'https://api.openweathermap.org/data/2.5/weather?units=imperial';
const fiveDayForecast = 'https://api.openweathermap.org/data/2.5/forecast?units=imperial';
const geocode = 'http://api.openweathermap.org/geo/1.0/direct?q='
var weatherAPIKey = prompt('Submit OpenWeather API Key:');
var citySearched;
var latitude;
var longitude;
var searchHistory = [];

init();

search.addEventListener('click', function(event) {
    if (event.target.tagName === 'BUTTON') {
        citySearched = event.target.innerHTML;
        console.log(citySearched);
        renderWeather(citySearched, false);
    }
});

submitCity.addEventListener('submit', function(event) {
    event.preventDefault();

    citySearched = cityInput.value;
    if (citySearched != '') {
        renderWeather(citySearched, true);
    }
});

// clear.addEventListener('click', function() {
//     if (confirm('Are you sure you want to clear your city search history?')) {
//         searchHistory = null;
//         localStorage.setItem('searchHistory', searchHistory);
//     }
// });

async function renderWeather(city, newSearch) {
    await fetch(geocode + city + '&limit=1&appid=' + weatherAPIKey)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        citySearched = data[0].name;
        latitude = data[0].lat;
        longitude = data[0].lon;
    });

    await fetch(currentWeather + '&lat=' + latitude + '&lon=' + longitude + '&appid=' + weatherAPIKey)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        today.children[0].textContent = citySearched + dayjs().format(' (MM/DD/YYYY)');
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
        for (var i = 0; i < 5; i++) {
            fiveDay.children[i].children[0].textContent = dayjs().add(i+1, 'day').format('(MM/DD/YYYY)');
            fiveDay.children[i].children[1].src = 'https://openweathermap.org/img/wn/' + data.list[i * 8].weather[0].icon + '@2x.png'
            fiveDay.children[i].children[2].textContent = `Temp: ${data.list[i * 8].main.temp}\xb0F`;
            fiveDay.children[i].children[3].textContent = `Wind: ${data.list[i * 8].wind.speed} MPH`;
            fiveDay.children[i].children[4].textContent = `Humidity: ${data.list[i * 8].main.humidity} %`;
        }
    });

    today.setAttribute('style', 'visibility: visible');
    h4.setAttribute('style', 'visibility: visible');
    fiveDay.setAttribute('style', 'visibility: visible');

    if (newSearch === true) {
        var button = document.createElement('button');
        button.textContent = citySearched;
        button.setAttribute('class', 'btn btn-light history');
        search.appendChild(button);

        searchHistory.push(citySearched);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }

}

function init() {
    var storedSearches = JSON.parse(localStorage.getItem('searchHistory'));

    if (storedSearches != null) {
        searchHistory = storedSearches;
        
        for (var i = 0; i < storedSearches.length; i++) {
            var button = document.createElement('button');
            button.textContent = storedSearches[i];
            button.setAttribute('class', 'btn btn-light history');
            search.appendChild(button);
        }
    }
}
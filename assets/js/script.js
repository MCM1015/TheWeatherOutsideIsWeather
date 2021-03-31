// VARIABLES
    var searchInputEl = $('.form-control');
    var searchButton = $('.input-group-text');
    var searchHistoryEl = $('.searchhistory');
    var cityStore = { city: [] };
    var cityNameEl = $('.cityname');
    var currentDateEl = $('.currentdate');
    var todayDate = moment().format('(M/DD/YYYY)');
    var weatherIconEl = $('.weathericon');
    var tempEl = $('.temp');
    var humidityEl = $('.humiditypercent');
    var windSpeedEl = $('.windspeed');
    var uvIndexEl = $('.uvindex');
    var fiveDayForecastEl = $('.fivedayforecast')
    var weatherAPIurl = ""
    var weatherAPIkey = ""
    
//today's date
currentDateEl.text(todayDate);

// FUNCTIONS

//fetch weather API


//append city name to html 
function cityNameSet() {
cityNameEl.text(searchInputEl.val());
}


//pull info from api and append current conditions icon, temp, humidity percent, wind speed and uv index
    //if uv index over certain amount set background color to red

//pull info from api and append 5 day forecast

//onclick search 
searchButton.on('click', function(){
    cityNameSet();
    storageSet();
});

//on click city search history

//store in local storage 
function storageSet(dataToSave) {
    city = cityNameEl.text()
    cityStore.city.push(dataToSave);
    console.log(city);
    console.log(cityStore)
    localStorage.setItem('cityname',JSON.stringify(city));
}

//pull from local storage, append to list as button
// function onLoad() {
//   if(localStorage.getItem('cityname') != '') {
//      cityStore = JSON.parse(localStorage.getItem('cityname'));
//    }
//    console.log(cityStore);
// }

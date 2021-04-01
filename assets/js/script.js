// VARIABLES
var searchInputEl = $('.form-control');
var searchButton = $('.input-group-text');
var searchHistoryEl = $('.searchhistory');
var cityNameEl = $('.cityname');
var currentDateEl = $('.currentdate');
var todayDate = moment().format('(M/DD/YYYY)');
var weatherIconEl = $('#weathericon');
var tempEl = $('.temp');
var humidityEl = $('.humiditypercent');
var windSpeedEl = $('.windspeed');
var uvIndexEl = $('.uvindex');
var fiveDayForecastEl = $('.fivedayforecast')
var APIkey = "df481ce65b9190480f195b99f169504b";
var cityArray = [];

var date1 = $('#1');
var date2 = $('#2');
var date3 = $('#3');
var date4 = $('#4');
var date5 = $('#5');

var temp1 = $('.temp1');
var temp2 = $('.temp2');
var temp3 = $('.temp3');
var temp4 = $('.temp4');
var temp5 = $('.temp5');

var humidity1 = $('.humidity1');
var humidity2 = $('.humidity2');
var humidity3 = $('.humidity3');
var humidity4 = $('.humidity4');
var humidity5 = $('.humidity5');


//today's date
currentDateEl.text(todayDate);

// FUNCTIONS

//fetch weather APIs - Search
//pull info from api and append current conditions icon, temp, humidity percent, wind speed and uv index
//if uv index over certain amount set background color to red
//pull info from api and append 5 day forecast
function APISearch() {
    var cityNameText = searchInputEl.val();
    var weatherCityAPIurl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityNameText + "&units=imperial&appid=" + APIkey;

    fetch(weatherCityAPIurl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //console.log(data)
            var currentWeatherIcon = data.weather[0].icon;
            var currentTemp = data.main.temp;
            var currentHumidity = data.main.humidity;
            var currentWindSpeed = data.wind.speed;
            var latitude = data.coord.lat;
            var longitude = data.coord.lon;
            var uvIndexAPIurl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude={part}&units=imperial&appid=" + APIkey
            var x = "http://openweathermap.org/img/wn/" + currentWeatherIcon + "@2x.png"

            document.getElementById("weathericon").src = x;
            tempEl.text(currentTemp);
            humidityEl.text(currentHumidity);
            windSpeedEl.text(currentWindSpeed);

            fetch(uvIndexAPIurl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data)
                uvIndexEl.text(data.current.uvi);
                if (data.current.uvi > 3) {
                    uvIndexEl.attr('class', 'red');
                }

                date1.text(moment.unix(data.daily[1].dt).format('(M/DD/YYYY)'));
                date2.text(moment.unix(data.daily[2].dt).format('(M/DD/YYYY)'));
                date3.text(moment.unix(data.daily[3].dt).format('(M/DD/YYYY)'));
                date4.text(moment.unix(data.daily[4].dt).format('(M/DD/YYYY)'));
                date5.text(moment.unix(data.daily[5].dt).format('(M/DD/YYYY)'));

                weatherIcon1 = data.daily[1].weather[0].icon;
                var x1 = "http://openweathermap.org/img/wn/" + weatherIcon1 + "@2x.png"
                document.getElementById("icon1").src = x1;

                weatherIcon2 = data.daily[2].weather[0].icon;
                var x2 = "http://openweathermap.org/img/wn/" + weatherIcon2 + "@2x.png"
                document.getElementById("icon2").src = x2;

                weatherIcon3 = data.daily[3].weather[0].icon;
                var x3 = "http://openweathermap.org/img/wn/" + weatherIcon3 + "@2x.png"
                document.getElementById("icon3").src = x3;

                weatherIcon4 = data.daily[4].weather[0].icon;
                var x4 = "http://openweathermap.org/img/wn/" + weatherIcon4 + "@2x.png"
                document.getElementById("icon4").src = x4;

                weatherIcon5 = data.daily[5].weather[0].icon;
                var x5 = "http://openweathermap.org/img/wn/" + weatherIcon5 + "@2x.png"
                document.getElementById("icon5").src = x5;



                temp1.text(data.daily[1].temp.max);
                temp2.text(data.daily[2].temp.max);
                temp3.text(data.daily[3].temp.max);
                temp4.text(data.daily[4].temp.max);
                temp5.text(data.daily[5].temp.max);

                humidity1.text(data.daily[1].humidity);
                humidity2.text(data.daily[2].humidity); 
                humidity3.text(data.daily[3].humidity); 
                humidity4.text(data.daily[4].humidity);
                humidity5.text(data.daily[5].humidity);
            });
        });
}

//append city name to html 
function cityNameSet() {
    cityNameEl.text(searchInputEl.val());
    APISearch();
}

//onclick search 
searchButton.on('click', function () {
    cityNameSet();
    storageSet();
    onLoad();
});


//store in local storage 
function storageSet() {
    city = cityNameEl.text()
    cityArray.push(city);
    localStorage.setItem('cityname', JSON.stringify(cityArray));
}

//pull from local storage, append to list as button
function onLoad() {
    if (localStorage.getItem('cityname') != '') {
        var cityStore = JSON.parse(localStorage.getItem('cityname'));
        if (cityStore != null) {
            for (var i = 0; i < cityStore.length; i++) {
                var btn = $("<button>");
                btn.text(cityStore[i]);
                searchHistoryEl.append(btn);
            }
        }
    }
}

//on click city search history
//fetch weather APIs - History
//pull info from api and append current conditions icon, temp, humidity percent, wind speed and uv index
//if uv index over certain amount set background color to red
//pull info from api and append 5 day forecast
searchHistoryEl.on('click', function (event) {
    if (event.target.matches('button')) {
        var cityNameText = event.target.innerHTML
        console.log(event.target.innerHTML);
        cityNameEl.text(event.target.innerHTML);
        var lat = "";
        var lon = "";
        var weatherCityAPIurl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityNameText + "&units=imperial&appid=" + APIkey;

        fetch(weatherCityAPIurl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                //console.log(data)
                var currentWeatherIcon = data.weather[0].icon;
                var currentTemp = data.main.temp;
                var currentHumidity = data.main.humidity;
                var currentWindSpeed = data.wind.speed;
                var latitude = data.coord.lat;
                var longitude = data.coord.lon;
                var uvIndexAPIurl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude={part}&units=imperial&appid=" + APIkey
                var x = "http://openweathermap.org/img/wn/" + currentWeatherIcon + "@2x.png"

                document.getElementById("weathericon").src = x;
                tempEl.text(currentTemp);
                humidityEl.text(currentHumidity);
                windSpeedEl.text(currentWindSpeed);

                fetch(uvIndexAPIurl)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        console.log(data)
                        uvIndexEl.text(data.current.uvi);
                        if (data.current.uvi > 3) {
                            uvIndexEl.attr('class', 'red');
                        }

                        date1.text(moment.unix(data.daily[1].dt).format('(M/DD/YYYY)'));
                        date2.text(moment.unix(data.daily[2].dt).format('(M/DD/YYYY)'));
                        date3.text(moment.unix(data.daily[3].dt).format('(M/DD/YYYY)'));
                        date4.text(moment.unix(data.daily[4].dt).format('(M/DD/YYYY)'));
                        date5.text(moment.unix(data.daily[5].dt).format('(M/DD/YYYY)'));

                        weatherIcon1 = data.daily[1].weather[0].icon;
                        var x1 = "http://openweathermap.org/img/wn/" + weatherIcon1 + "@2x.png"
                        document.getElementById("icon1").src = x1;

                        weatherIcon2 = data.daily[2].weather[0].icon;
                        var x2 = "http://openweathermap.org/img/wn/" + weatherIcon2 + "@2x.png"
                        document.getElementById("icon2").src = x2;

                        weatherIcon3 = data.daily[3].weather[0].icon;
                        var x3 = "http://openweathermap.org/img/wn/" + weatherIcon3 + "@2x.png"
                        document.getElementById("icon3").src = x3;

                        weatherIcon4 = data.daily[4].weather[0].icon;
                        var x4 = "http://openweathermap.org/img/wn/" + weatherIcon4 + "@2x.png"
                        document.getElementById("icon4").src = x4;

                        weatherIcon5 = data.daily[5].weather[0].icon;
                        var x5 = "http://openweathermap.org/img/wn/" + weatherIcon5 + "@2x.png"
                        document.getElementById("icon5").src = x5;



                        temp1.text(data.daily[1].temp.max);
                        temp2.text(data.daily[2].temp.max);
                        temp3.text(data.daily[3].temp.max);
                        temp4.text(data.daily[4].temp.max);
                        temp5.text(data.daily[5].temp.max);

                        humidity1.text(data.daily[1].humidity);
                        humidity2.text(data.daily[2].humidity); 
                        humidity3.text(data.daily[3].humidity); 
                        humidity4.text(data.daily[4].humidity);
                        humidity5.text(data.daily[5].humidity);
                    });
            });
    }
});

onLoad();




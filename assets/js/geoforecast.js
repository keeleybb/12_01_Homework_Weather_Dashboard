var onLoadLat;
var onLoadLon;
// console.log(location.coords.latitude);

navigator.geolocation.getCurrentPosition(function(location) {
  onLoadLat = location.coords.latitude;
  onLoadLon = location.coords.longitude;
  getCurrentWeatherLoad(onLoadLat, onLoadLon);
});

function getCurrentWeatherLoad(lat, lon) {
  // Here we are building the URL we need to query the database
  //For Todays Weather
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    APIKey;

  // We then created an AJAX call
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    $(".city-name").html(response.name + " (" + date + ") ");
    $(".weather-display").attr(
      "src",
      "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png"
    );
    $(".temp").html(
      "Temperature: " +
        ((response.main.temp - 273.15) * 1.8 + 32).toFixed(2) +
        "&#176;F"
    );
    $(".humidity").text("Humidity: " + response.main.humidity + "%");
    $(".wind").html("Wind Speed: " + response.wind.speed + " MPH");
    uvIndex(lat, lon);
    var city = response.name;
    getFiveDay(city);
  });
}
// getCurrentWeather();

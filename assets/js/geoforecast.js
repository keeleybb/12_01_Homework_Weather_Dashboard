var onLoadLat;
var onLoadLon;
console.log(window);
// console.log(location.coords.latitude);

navigator.geolocation.getCurrentPosition(function(location) {
  console.log(location.coords.latitude);
  onLoadLat = location.coords.latitude;
  console.log(onLoadLat);
  console.log(location.coords.longitude);
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
    // Create CODE HERE to Log the queryURL
    // console.log(queryURL);
    // Create CODE HERE to log the resulting object
    // console.log(response);
    $(".city-name").html(response.name + " (" + date + ") ");
    $(".weather-display").attr(
      "src",
      "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png"
    );
    $(".wind").html("Wind Speed: " + response.wind.speed);
    $(".humidity").text("Humidity: " + response.main.humidity);
    $(".temp").text(
      "Temp (f): " + ((response.main.temp - 273.15) * 1.8 + 32).toFixed(2)
    );
    uvIndex(lat, lon);
    var city = response.name;
    getFiveDay(city);
  });
}
// getCurrentWeather();

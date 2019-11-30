// This is our API key. Add your own API key between the ""
var APIKey = "dae7d6e81316318ac7b8037574e0fe1c";
var date = moment().format("L");
var city = "denver,colorado";
var cities = [];
var localCities = JSON.parse(localStorage.getItem("cities")) || cities;

function getCurrentWeather() {
  var city = $(this).attr("data-name");
  getFiveDay(city);

  // Here we are building the URL we need to query the database
  //For Todays Weather
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey;

  // We then created an AJAX call
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    // Create CODE HERE to Log the queryURL
    console.log(queryURL);
    // Create CODE HERE to log the resulting object
    console.log(response);
    //   Create CODE HERE to transfer content to HTML
    console.log(response.name);
    console.log(response.wind.speed);
    console.log(response.main.humidity);
    console.log(response.weather[0].icon);
    // var iconURL =
    //   "http://openweathermap.org/img/wn/" +
    //   response.weather[0].icon +
    //   "@2x.png";
    // console.log(iconURL);

    // console.log(imgMainWeather);
    var imgWeather = $("<img>").attr(
      "src",
      "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png"
    );
    imgWeather.attr("style", "width:50px;");
    $(".city-name").html("<h1>" + response.name + " (" + date + ")" + "</h1>");
    $(".city-name").append(imgWeather);
    $(".wind").html("Wind Speed: " + response.wind.speed);
    $(".humidity").text("Humidity: " + response.main.humidity);
    $(".temp").text(
      "Temp (f): " + ((response.main.temp - 273.15) * 1.8 + 32).toFixed(2)
    );
  });
}

//for 5day forecast
function getFiveDay(city) {
  var queryURLFive =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    APIKey;

  $.ajax({
    url: queryURLFive,
    method: "GET"
  }).then(function(response) {
    console.log("This is for 5 day");
    // console.log(response);
    console.log(response);
    console.log(response.list);
    var option = response.list[i].dt_txt.substring(10);
    for (var i = 0; i < 40; i++) {
      if ("12:00:00" === option) {
        console.log(response.list[i]);
        console.log(response.list[i].dt_txt);
        console.log(response.list[i].dt_txt.substring(10));
        console.log("made it", response.list[i]);
      }
      // if ("06:00:00" = option){

      // }
    }
  });
}

//   Create CODE HERE to transfer content to HTML
//   console.log(response.name);
//   console.log(response.wind.speed);
// $(".city").text("city: " + response.name);
// $(".wind").html("Wind Speed: " + response.wind.speed);
// $(".humidity").text("Humidity: " + response.main.humidity);
// $(".temp").text(
//   "Temp (f): " + ((response.main.temp - 273.15) * 1.8 + 32).toFixed(2)
// )};

// Create CODE HERE to calculate the temperature (converted from Kelvin)
// Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
// Create CODE HERE to dump the temperature content into HTML
// });

function renderButtons() {
  // Deletes the movies prior to adding new movies
  $("#buttons-view").empty();
  // Loops through the array of movies
  for (var i = 0; i < cities.length; i++) {
    // Then dynamicaly generates buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adds a class of movie to our button
    a.addClass("btn city big-btn");
    // Added a data-attribute
    a.attr("data-name", cities[i]);
    // Provided the initial button text
    a.text(cities[i]);
    // Added the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where the add movie button is clicked
$("#add-city").on("click", function(event) {
  event.preventDefault();
  // This line of code will grab the input from the textbox
  var city = $("#city-input")
    .val()
    .trim();
  // The movie from the textbox is then added to our array
  cities.push(city);
  //Need to add data to local storage
  localStorage.setItem("cities", JSON.stringify(cities));
  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

$(document).on("click", ".city", getCurrentWeather);
// getFiveDay

///Make array and add searches to local storage for reuse
//Add uv index query and functionality for color
//Get dates converted for 5 day
//Get noon hour displaying
//Figure out how to average

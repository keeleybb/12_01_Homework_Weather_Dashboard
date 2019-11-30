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
    var uvLat = response.coord.lat;
    var uvLon = response.coord.lon;
    uvIndex(uvLat, uvLon);
  });
}

function uvIndex(uvLat, uvLon) {
  //Try UV index
  var queryURLUV =
    "http://api.openweathermap.org/data/2.5/uvi?appid=" +
    APIKey +
    "&lat=" +
    uvLat +
    "&lon=" +
    uvLon;

  $.ajax({
    url: queryURLUV,
    method: "GET"
  }).then(function(response) {
    // console.log(response);
    console.log(response.value);
    var uvFinal = response.value;
    var btnUV = $("<span>").text(response.value);
    $(".uv-index").text("UV Index: ");
    $(".uv-index").append(btnUV);
    if (response.value < 3.0) {
      btnUV.attr("class", "green-uv");
    } else if (response.value >= 3.0 && response.value < 6.0) {
      btnUV.attr("class", "yellow-uv");
    } else if (response.value >= 6.0 && response.value < 8.0) {
      btnUV.attr("class", "orange-uv");
    } else if (response.value >= 8.0 && response.value < 11.0) {
      btnUV.attr("class", "red-uv");
    } else if (response.value >= 11.0) {
      btnUV.attr("class", "purple-uv");
    }
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
    console.log(response);
    // console.log(response);
    // console.log(response.list);
    for (var i = 0; i < 40; i++) {
      var option = response.list[i].dt_txt.substring(11);
      if ("12:00:00" == option) {
        console.log("made it ", option, " ", response.list[i]);
        console.log(response.list[i].dt_txt.substring(0, 10));
        //Convert the date using moment js
        var dateString = response.list[i].dt_txt.substring(0, 10);
        var date = new moment(dateString);
        console.log(date.format("MM/DD/YYYY"));
      }
    }

    //Might be nice to use a loop to fill in the days instead or for each with specific class name
  });
}

function renderButtons() {
  // Deletes the movies prior to adding new movies
  $("#buttons-view").empty();
  // Loops through the array of movies
  for (var i = 0; i < localCities.length; i++) {
    // Then dynamicaly generates buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adds a class of movie to our button
    a.addClass("btn city big-btn");
    // Added a data-attribute
    a.attr("data-name", localCities[i]);
    // Provided the initial button text
    a.text(localCities[i]);
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
  localCities.push(city);
  //Need to add data to local storage
  localStorage.setItem("cities", JSON.stringify(localCities));
  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

$(document).on("click", ".city", getCurrentWeather);
// getFiveDay
renderButtons();
///Make array and add searches to local storage for reuse
//Add uv index query and functionality for color
//Get dates converted for 5 day
//Get noon hour displaying
//Figure out how to average

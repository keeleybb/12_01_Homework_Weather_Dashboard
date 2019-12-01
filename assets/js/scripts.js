var APIKey = "dae7d6e81316318ac7b8037574e0fe1c";
var date = moment().format("L");
var city;
var cities = [];
var localCities = JSON.parse(localStorage.getItem("cities")) || cities;

function getCurrentWeather() {
  getFiveDay(city);

  //For Todays Weather
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey;

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {
      //Show Current Weather
      console.log(response);
      $(".city-name").html(response.name + " (" + date + ") ");
      $(".weather-display").attr(
        "src",
        "http://openweathermap.org/img/wn/" +
          response.weather[0].icon +
          "@2x.png"
      );
      $(".wind").html("Wind Speed: " + response.wind.speed);
      $(".humidity").text("Humidity: " + response.main.humidity + "%");
      $(".temp").html(
        "Temperature: " +
          ((response.main.temp - 273.15) * 1.8 + 32).toFixed(2) +
          "&#176;F"
      );
      var uvLat = response.coord.lat;
      var uvLon = response.coord.lon;
      uvIndex(uvLat, uvLon);
    })
    .catch(e => alert("Error: Please try another city"));
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
  var dateArray = [];
  var iconArray = [];
  var tempArray = [];
  var humidityArray = [];

  $.ajax({
    url: queryURLFive,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    // console.log(response);
    // console.log(response.list);
    for (var i = 0; i < 40; i++) {
      var option = response.list[i].dt_txt.substring(11);
      var dateValue = response.list[i].dt_txt.substring(0, 10);
      var currentDate = moment().format("YYYY-MM-DD");
      if ("15:00:00" == option && dateValue != currentDate) {
        // console.log(response.list[i].dt_txt.substring(0, 10));
        //Convert the date using moment js
        var dateString = response.list[i].dt_txt.substring(0, 10);
        var date = new moment(dateString);
        var formatDate = date.format("MM/DD/YYYY");
        console.log(formatDate);
        //Date
        dateArray.push(formatDate);
        console.log(dateArray);
        //Icon
        iconArray.push(response.list[i].weather[0].icon);
        console.log(iconArray);
        //Temp
        tempArray.push(
          ((response.list[i].main.temp - 273.15) * 1.8 + 32).toFixed(2)
        );
        console.log(tempArray);

        //Humidity
        humidityArray.push(response.list[i].main.humidity);
        console.log(humidityArray);
      }
    }

    //Empty the forecast
    for (var i = 0; i < dateArray.length; i++) {
      $(".forecast" + [i]).empty();
    }
    //Apply 5 Day Forecast to page
    for (var i = 0; i < dateArray.length; i++) {
      //Date
      var newDate = $("<h4>").text(dateArray[i]);
      $(".forecast" + [i]).append(newDate);
      //Img Stuff
      var newImg = $("<img>");
      newImg.attr(
        "src",
        "http://openweathermap.org/img/wn/" + iconArray[i] + "@2x.png"
      );
      $(".forecast" + [i]).append(newImg);
      //Stuff for Temp
      var newTemp = $("<p>").html("Temp: " + tempArray[i] + "&#176;F");
      $(".forecast" + [i]).append(newTemp);
      //Stuff for Temp
      var newHumidity = $("<p>").html("Humidity: " + humidityArray[i] + "%");
      $(".forecast" + [i]).append(newHumidity);
    }
  });
}

function renderButtons() {
  // Deletes the cities prior to adding new cities
  $("#buttons-view").empty();
  // Loops through the array of movies
  for (var i = 0; i < localCities.length; i++) {
    var a = $("<button>");
    a.addClass("btn city big-btn");
    a.attr("data-name", localCities[i]);
    a.text(localCities[i]);
    $("#buttons-view").append(a);
  }
}

// This function handles events where the search button is clicked
$("#add-city").on("click", function(event) {
  event.preventDefault();
  // This line of code will grab the input from the textbox
  var cityInput = $("#city-input")
    .val()
    .trim();

  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityInput +
    "&appid=" +
    APIKey;

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {
      // The city from the textbox is then added to our array
      localCities.push(cityInput);
      //Need to add data to local storage
      localStorage.setItem("cities", JSON.stringify(localCities));
      renderButtons();
      city = cityInput;
      //Clear city input
      $("#city-input, textarea").val("");
      getCurrentWeather();
    })
    .catch(e => alert("Error: Please try another city"));
});

$(document).on("click", ".city", function() {
  city = $(this).attr("data-name");
  getCurrentWeather();
});
renderButtons();

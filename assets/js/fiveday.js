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
      if ("12:00:00" == option) {
        console.log("made it ", option, " ", response.list[i]);
        // console.log(response.list[i].dt_txt.substring(0, 10));
        //Convert the date using moment js
        var dateString = response.list[i].dt_txt.substring(0, 10);
        var date = new moment(dateString);
        var formatDate = date.format("MM/DD/YYYY");
        console.log(formatDate);
        //Push these to an array

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
      } else if ("06:00:00" == option) {
      }
    }

    //Empty the forecast
    for (var i = 0; i < dateArray.length; i++) {
      $(".forecast" + [i]).empty();
    }
    //Apply to page
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
    //Might be nice to use a loop to fill in the days instead or for each with specific class name
  });
}

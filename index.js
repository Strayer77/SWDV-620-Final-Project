/*This is the API key used to access weather information on openweathermap.org */
const appKey = "302ea8b9b134fd1625cb20dbf1ac8c00";

let searchButton = document.getElementById("search-btn");
let searchInput = document.getElementById("search-txt");
let cityName = document.getElementById("city-name");
let icon = document.getElementById("icon");
let temperature = document.getElementById("temp");
let humidity = document.getElementById("humidity-div");

searchButton.addEventListener("click", findWeatherDetails);
searchInput.addEventListener("keyup", enterPressed);

/*--------------------------------------------------------------------------------*/
function enterPressed(event) {
  if (event.key === "Enter") {
    findWeatherDetails();
  }
}

/*--------------------------------------------------------------------------------*/
/*this function puts the url, search input value, and the api key into one string or url */
function findWeatherDetails() {
  if (searchInput.value === "") {
  
  }else {
    let searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid="+appKey;
   httpRequestAsync(searchLink, theResponse);
  }
 }

/*--------------------------------------------------------------------------------*/
/*function that parses the json data pulled from the weather website, specifically
the name, temp, humidity, and icon image */
function theResponse(response) {
  let jsonObject = JSON.parse(response);
  cityName.innerHTML = jsonObject.name;
  icon.src = "http://openweathermap.org/img/w/" + jsonObject.weather[0].icon + ".png";
  temperature.innerHTML = parseInt(jsonObject.main.temp * (9/5) - 459.67) + "°";
  humidity.innerHTML = jsonObject.main.humidity + "%";
}

/*--------------------------------------------------------------------------------*/
/*this function takes the input from html - the location - and makes an api call
using my api key */
function httpRequestAsync(url, callback)
{
  console.log("hello");
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => { 
        if (httpRequest.readyState == 4 && httpRequest.status == 200)
            callback(httpRequest.responseText);
    }
    httpRequest.open("GET", url, true);
    httpRequest.send();
}
const apiKey = "6cef7f4908524734b73113814260402";
const apiUrl = "http://api.weatherapi.com/v1/current.json?aqi=yes&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&key=${apiKey}`);

    if (!response.ok) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
      return;
    }

    const data = await response.json();

    document.querySelector(".city").innerHTML =
      `${data.location.name}, ${data.location.country}`;
    document.querySelector(".temp").innerHTML =
      Math.round(data.current.temp_c) + "°C";
    document.querySelector(".humidity").innerHTML =
      data.current.humidity + "%";
    document.querySelector(".wind").innerHTML =
      data.current.wind_kph + " km/h";

    // Change weather icon
    const condition = data.current.condition.text.toLowerCase();

    if (condition.includes("cloud")) {
      weatherIcon.src = "img/clouds.png";
    } else if (condition.includes("rain")) {
      weatherIcon.src = "img/rain.png";
    } else if (condition.includes("clear")) {
      weatherIcon.src = "img/clear.png";
    } else if (condition.includes("snow")) {
      weatherIcon.src = "img/snow.png";
    } else if (condition.includes("mist")) {
      weatherIcon.src = "img/mist.png";
    } else {
      weatherIcon.src = data.current.condition.icon;
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";

  } catch (error) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }
}

// Button click
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

// Press Enter key
searchBox.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
  }
});

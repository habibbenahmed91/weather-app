const ApiKey = "bd15987f32b3d8bc21b83633bbb05fdc";
const dataContainer = document.querySelector(".data-container");
const weatherForm = document.querySelector(".weather-form");
const countryInput = weatherForm.country;
const cityInput = weatherForm.city;

function getData(apiUrl) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.onload = function () {
      if (this.readyState === 4 && this.status === 200) {
        resolve(JSON.parse(this.responseText));
      } else {
        reject(Error("Ther Are No Data To Show!"));
      }
    };
    request.open("GET", apiUrl);
    request.send();
  });
}

function fixInputs() {
  countryInput.value = "";
  cityInput.value = "";
  countryInput.focus();
}

function weather_ui(data) {
  dataContainer.innerHTML = "";
  let weatherDataEl = document.createElement("div");
  weatherDataEl.className = "weather-data";
  weatherDataEl.innerHTML = `
    <span>Location: ${data.name}, ${data.sys.country}</span>
    <span>Temprature: ${data.main.temp}</span>
    <span>Humidity: ${data.main.humidity}</span>
    <span>Conditions: ${data.weather[0].description}</span>
  `;
  dataContainer.appendChild(weatherDataEl);
}

function error_ui(error) {
  dataContainer.innerHTML = "";
  let errorEl = document.createElement("p");
  errorEl.className = "error";
  errorEl.innerHTML = error;
  dataContainer.appendChild(errorEl);
}

weatherForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let country = countryInput.value;
  let city = cityInput.value;
  const ApiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}%2C${country}&appid=${ApiKey}`;
  getData(ApiUrl)
    .then((result) => weather_ui(result))
    .catch((err) => error_ui(err));
  fixInputs();
});

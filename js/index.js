function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.textContent = temperature;

  let cityName = document.querySelector(".cityName span");
  let countryName = document.querySelector(".cityName");
  countryName.textContent = `${response.data.name}, ${response.data.sys.country}`;

  let tempDescriptionEl = document.querySelector("#condition");
  let condition = response.data.weather[0].description;
  let conditionIcon = response.data.weather[0].icon;
  let conditionIconUrl = `https://openweathermap.org/img/wn/${conditionIcon}@2x.png`;
  let img = document.createElement("img");
  img.src = conditionIconUrl;
  tempDescriptionEl.innerHTML = condition;
  tempDescriptionEl.appendChild(img);
}

function signUp(event) {
  event.preventDefault();
  let input = document.querySelector("#city");
  let city = input.value.trim();
  let keyApi = "280468a3ae32a4bb87f5a9d9dad11282";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${keyApi}&units=metric`;
  input.value = "";
  axios.get(apiUrl).then(showTemperature);
}
let form = document.querySelector("form");
form.addEventListener("submit", signUp);

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let keyApi = "280468a3ae32a4bb87f5a9d9dad11282";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${keyApi}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getCurrentLocation);

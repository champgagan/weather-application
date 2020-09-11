const form = document.querySelector("form");
const locationText = document.querySelector("#searchValue");
const text = document.querySelector("#errorOrCity");
const weatherdata = document.querySelector("#showWeather");
const imageL = document.querySelector("#imageloading");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  weatherdata.textContent = "";
  imageL.style.display='block';
  text.textContent = '';
  fetch("http://localhost:8081/weather?address=" + locationText.value)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        text.textContent = data.error;
      } else {
        text.textContent = data.location;
        weatherdata.textContent = data.forecast;
      }
      imageL.style.display='none';
    });
});

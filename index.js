// store
const store = {
  city: "",
  country: "",
  defaultCity: "Gazipur",
  defaultCountry: "BD",

  //geting data from local storage
  getLocation() {
    localStorage.getItem("city") === null
      ? (this.city = this.defaultCity)
      : (this.city = localStorage.getItem("city"));

    localStorage.getItem("country") === null
      ? (this.country = this.defaultCountry)
      : (this.country = localStorage.getItem("country"));

    return {
      city: this.city,
      country: this.country,
    };
  },
  // seting data to local storage
  setLocation(city, country) {
    localStorage.setItem("city", city);
    localStorage.setItem("country", country);
  },
};

//=====================================================================================================//

// Ui
const ui = {
  city: document.querySelector("#w-city"),
  icon: document.querySelector("#w-icon"),
  temperature: document.querySelector("#w-temp"),
  Perature: document.querySelector("#w-prea"),
  Humidity: document.querySelector("#w-humidity"),
  feel: document.querySelector("#w-feel"),

  print({
    main_data: { temp, pressure, humidity },
    overall_data: { main, icon },
    cityName,
  }) {
    const iconUrl = ui.generateIcon(icon);

    this.city.textContent = cityName;

    this.icon.setAttribute("src", iconUrl);

    this.temperature.innerHTML = `Temperature: ${temp} <sup>&#8451</sup>`;

    this.Perature.textContent = `Perature(hpa): ${pressure}`;

    this.Humidity.textContent = `Humidity : ${humidity}%`;

    this.feel.textContent = main;
  },

  generateIcon(icon) {
    return "https://openweathermap.org/img/w/" + icon + ".png";
  },

  clearField() {
    document.querySelector("#country").value = "";
    document.querySelector("#city").value = "";
  },

  setMassege(mag) {
    const para = document.querySelector("#massegeWrapper");

    setTimeout(() => {}, 1000);
    const div = document.createElement("div");
    div.id = "message";

    div.className = "alert alert-danger d-flex";
    div.textContent = mag;

    const icon = document.createElement("span");
    icon.id = "icon";
    icon.className = "ml-auto";
    icon.innerHTML = `<i class="far fa-times-circle" id="close"></i>`;

    para.appendChild(div);

    div.appendChild(icon);

    icon.style.cursor = "pointer";

  },

  closeMassege() {
    document.querySelector("#massegeWrapper").addEventListener("click", (e) => {
      if ((e.target.id = "icon")) {
        e.target.parentElement.parentElement.remove();
      }
    });
  },
};

//=====================================================================================================//

//Weather

const weather = {
  city: "Gazipur",
  country: "BD",
  APPId: "00687502f6fed1a6cce0582a4a77c1ce",

  async getWeather() {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.country}&appid=${this.APPId}&units=metric`
    );
    const responseData = await response.json();

    return {
      main_data: responseData.main,
      cityName: responseData.name,

      overall_data: responseData.weather[0],
    };
  },

  setLocation(city, country) {
    this.city = city;
    this.country = country;
  },
};

//instenset the new class
function weatherData() {
  weather
    .getWeather()
    .then((data) => {
      ui.print(data);
    })
    .catch((err) => {
      ui.setMassege("your city is not found");
    });
}

//=====================================================================================================//

// Main

const { city, country } = store.getLocation();

weather.city = city;
weather.country = country;

document.addEventListener("DOMContentLoaded", weatherData);

document.querySelector("#form").addEventListener("submit", (e) => {
  e.preventDefault();

  let country = document.querySelector("#country").value;

  let city = document.querySelector("#city").value;


  if (city === "" || country === "") {
    ui.setMassege("plz input nessary information");

    document.querySelector("#close").addEventListener("click", (e) => {
      ui.closeMassege();
    });
  } else {
    store.setLocation(city, country);
    weather.setLocation(city, country);
    ui.clearField();
    weatherData();
    ui.closeMassege();
  }
});

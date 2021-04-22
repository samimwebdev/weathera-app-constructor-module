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
  printingDataFromLocalStorage() {
    const { city, country } = this.getLocation();

    weather.city = city;
    weather.country = country;
  },
};

//=====================================================================================================//

// Ui
const ui = {
  selectors() {
    const city = document.querySelector("#w-city");
    const placeIcon = document.querySelector("#w-icon");
    const temperature = document.querySelector("#w-temp");
    const placePerature = document.querySelector("#w-prea");
    const Humidity = document.querySelector("#w-humidity");
    const feel = document.querySelector("#w-feel");
    const MainCountry = document.querySelector("#country");
    const MainCity = document.querySelector("#city");
    const para = document.querySelector("#massegeWrapper");
    const massegeWrapper = document.querySelector("#massegeWrapper");
    const form = document.querySelector("#form");
    const closeIcon = document.querySelector("#close");

    return {
      city,
      placeIcon,
      temperature,
      placePerature,
      Humidity,
      feel,
      para,
      MainCountry,
      massegeWrapper,
      MainCity,
      form,
      closeIcon,
    };
  },
  init() {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let country = document.querySelector("#country").value;

      let city = document.querySelector("#city").value;

      if (city === "" || country === "") {
        ui.setMassege("plz input nessary information");

        closeIcon.addEventListener("click", (e) => {
          ui.closeMassege();
        });
      } else {
        store.setLocation(city, country);
        weather.setLocation(city, country);
        ui.clearField();
        weather.weatherData();
        ui.closeMassege();
      }
    });
    document.addEventListener("DOMContentLoaded", weather.weatherData);
    store.printingDataFromLocalStorage();
  },
  print({
    main_data: { temp, pressure, humidity },
    overall_data: { main, icon },
    cityName,
  }) {
    const {
      city,
      placeIcon,
      temperature,
      placePerature,
      Humidity,
      feel,
    } = this.selectors();

    const iconUrl = ui.generateIcon(icon);

    city.textContent = cityName;

    placeIcon.setAttribute("src", iconUrl);

    temperature.innerHTML = `Temperature: ${temp} <sup>&#8451</sup>`;

    placePerature.textContent = `Perature(hpa): ${pressure}`;

    Humidity.textContent = `Humidity : ${humidity}%`;

    feel.textContent = main;
  },

  generateIcon(icon) {
    return "https://openweathermap.org/img/w/" + icon + ".png";
  },

  clearField() {
    const { MainCountry, MainCity } = this.selectors();
    MainCountry.value = "";
    MainCity.value = "";
  },

  setMassege(mag) {
    const { para } = this.selectors();

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
    const { massegeWrapper } = this.selectors();
    massegeWrapper.addEventListener("click", (e) => {
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

  weatherData() {
    weather
      .getWeather()
      .then((data) => {
        console.log();
        ui.print(data);
      })
      .catch((err) => {
        ui.setMassege("your city is not found");
      });
  },
};

//=====================================================================================================//

// Main
ui.init();

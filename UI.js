import { Weather } from './Weather'
import { Store } from "./Store";


function UI() {
  this.selectors = function () {
    const city = document.querySelector('#w-city')
    const placeIcon = document.querySelector('#w-icon')
    const temperature = document.querySelector('#w-temp')
    const placePerature = document.querySelector('#w-prea')
    const Humidity = document.querySelector('#w-humidity')
    const feel = document.querySelector('#w-feel')
    const MainCountry = document.querySelector('#country')
    const MainCity = document.querySelector('#city')
    const para = document.querySelector('#massegeWrapper')
    const massegeWrapper = document.querySelector('#massegeWrapper')
    const form = document.querySelector('#form')
    const closeIcon = document.querySelector('#close')

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
      closeIcon
    }
  }
  this.print = function ({
    main_data: { temp, pressure, humidity },
    overall_data: { main, icon },
    cityName
  }) {
    const {
      city,
      placeIcon,
      temperature,
      placePerature,
      Humidity,
      feel
    } = this.selectors()

    const iconUrl = generateIcon(icon)

    city.textContent = cityName

    placeIcon.setAttribute('src', iconUrl)

    temperature.innerHTML = `Temperature: ${temp} <sup>&#8451</sup>`

    placePerature.textContent = `Perature(hpa): ${pressure}`

    Humidity.textContent = `Humidity : ${humidity}%`

    feel.textContent = main
  }

  const generateIcon = function (icon) {
    return 'https://openweathermap.org/img/w/' + icon + '.png'
  }

  this.clearField = function () {
    const { MainCountry, MainCity } = this.selectors()
    MainCountry.value = ''
    MainCity.value = ''
  }

  this.setMassege = function (mag) {
    const { para } = this.selectors()

    const div = document.createElement('div')
    div.id = 'message'

    div.className = 'alert alert-danger d-flex'
    div.textContent = mag

    const icon = document.createElement('span')
    icon.id = 'icon'
    icon.className = 'ml-auto'
    icon.innerHTML = `<i class="far fa-times-circle" id="close"></i>`

    para.appendChild(div)

    div.appendChild(icon)

    icon.style.cursor = 'pointer'

    setTimeout(() => {
      div.querySelector('#close').parentElement.parentElement.remove()
    }, 2000)
  }

  this.closeMassege = function () {
    const { massegeWrapper } = this.selectors()
    massegeWrapper.addEventListener('click', e => {
      if (e.target.id = 'close') {
        e.target.parentElement.parentElement.remove()
      }
    })
  }
}

UI.init = function () {
  const store = new Store()
  const weather = new Weather()
  const ui = new UI()
  ui.selectors().form.addEventListener('submit', e => {
    e.preventDefault()

    let country = document.querySelector('#country').value

    let city = document.querySelector('#city').value

    if (city === '' || country === '') {
      ui.setMassege('plz input necessary information')

      ui.selectors().closeIcon.addEventListener('click', e => {
        ui.closeMassege()
      })
    } else {
      store.setLocation(city, country)
      weather.setLocation(city, country)
      ui.clearField()
      weather.weatherData()
      ui.closeMassege()
    }
  })
  document.addEventListener('DOMContentLoaded', weather.weatherData)
  store.printingDataFromLocalStorage()
}


export { UI }
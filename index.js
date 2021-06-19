function Storage() {
  this.save = function (city, country) {
    localStorage.setItem('city', city)
    localStorage.setItem('country', country)
  }

  this.getData = function () {
    const city = localStorage.getItem('city')
    const country = localStorage.getItem('country')
    return { city, country }
  }
}

function Http() {
  const ui = new UI()

  this.city = 'Chandpur'
  this.country = 'BD'

  this.getWeatherData = async function () {
    if (!this.city) {
      this.city = 'chandpur'
    }
    if (!this.country) {
      this.country = 'BD'
    }
    try {
      const api_key = 'b6f9d9db9a5d8afcb113312a99248002'
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.country}&units=metric&appid=${api_key}`
      )
      const data = await res.json()

      if (data.cod === '404' && data.message) {
        ui.showMessage(data.message)
        return
      }

      ui.paint(data)
    } catch (err) {
      ui.showMessage(err.message)
    }
  }
}

function UI() {
  this.loadSelectors = function () {
    const messageElm = document.querySelector('#messageWrapper')
    const countryInputElm = document.querySelector('#country')
    const cityInputElm = document.querySelector('#city')
    const BtnElm = document.querySelector('#button')
    const tempElm = document.querySelector('#w-temp')
    const cityElm = document.querySelector('#w-city')
    const iconElm = document.querySelector('#w-icon')
    const pressureElm = document.querySelector('#w-pressure')
    const feelElm = document.querySelector('#w-feel')
    const humidityElm = document.querySelector('#w-humidity')
    return {
      messageElm,
      countryInputElm,
      cityInputElm,
      BtnElm,
      tempElm,
      cityElm,
      iconElm,
      pressureElm,
      feelElm,
      humidityElm
    }
  }
  this.showMessage = function (msg) {
    const { messageElm } = this.loadSelectors()

    const elm = `<div id="message" class="alert alert-danger d-flex">
            ${msg}
            <span id="icon" class="ml-auto" style="cursor: pointer"
              ><i class="far fa-times-circle" id="close"></i
            ></span>
          </div>`
    //showing the error message
    messageElm.insertAdjacentHTML('afterbegin', elm)

    //checking if the error message exist or not
    if (document.querySelector('#message')) {
      //hiding the message
      this.hideMessage()
    }
  }
  this.hideMessageInst = function () {
    const msgInnerElm = document.querySelector('#message')

    msgInnerElm.remove()
  }
  this.hideMessage = function () {
    const msgInnerElm = document.querySelector('#message')
    setTimeout(() => {
      msgInnerElm.remove()
    }, 5000)
  }
  this.paint = function (weatherData) {
    const {
      name,
      main: { pressure, temp, humidity }
    } = weatherData

    const { icon, main } = weatherData.weather[0]
    console.log(weatherData)

    const iconUrl = 'http://openweathermap.org/img/w/' + icon + '.png'

    const {
      cityElm,
      tempElm,
      pressureElm,
      humidityElm,
      feelElm,
      iconElm
    } = this.loadSelectors()
    tempElm.textContent = `Temperature:${temp}℃`
    pressureElm.textContent = `Pressure:${pressure} kpa`
    humidityElm.textContent = `Humidity:${humidity}`
    feelElm.textContent = main
    cityElm.textContent = name
    //setting up icon
    iconElm.setAttribute('src', iconUrl)
  }
  this.resetInput = function () {
    const { cityInputElm, countryInputElm } = this.loadSelectors()
    cityInputElm.value = ''
    countryInputElm.value = ''
  }
}

UI.init = function () {
  const storage = new Storage()
  const http = new Http()
  const ui = new UI()

  const {
    BtnElm,
    cityInputElm,
    countryInputElm,
    messageElm
  } = ui.loadSelectors()

  BtnElm.addEventListener('click', e => {
    //prevent form submission
    e.preventDefault()

    const city = cityInputElm.value
    const country = countryInputElm.value
    if (city === '' || country === '') {
      //show error message
      ui.showMessage('Please fill up the required field')
    } else {
      http.city = city
      http.country
      http.getWeatherData()
      ui.resetInput()
      //save city and country to localStorage
      storage.save(city, country)
    }
  })

  messageElm.addEventListener('click', e => {
    if (e.target.id === 'close') {
      ui.hideMessageInst()
    }
  })
  //DOM content loaded
  window.addEventListener('DOMContentLoaded', () => {
    //getting saved data from localStorage
    const { city, country } = storage.getData()

    http.city = city
    http.country = country

    http.getWeatherData()
  })
}

UI.init()

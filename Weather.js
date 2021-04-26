import { UI } from './UI'

function Weather() {
  const ui = new UI()
  const $this = this

  this.city = 'Gazipur'
  this.country = 'BD'
  const APPId = '00687502f6fed1a6cce0582a4a77c1ce'

  const getWeather = async function () {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${$this.city},${$this.country}&appid=${APPId}&units=metric`
    )
    const responseData = await response.json()

    return {
      main_data: responseData.main,
      cityName: responseData.name,

      overall_data: responseData.weather[0]
    }
  }

  this.setLocation = function (city, country) {
    this.city = city
    this.country = country
  }

  this.weatherData = function () {
    getWeather()
      .then(data => {
        ui.print(data)
      })
      .catch(err => {
        ui.setMassege('your city is not found')
      })
  }
}


export { Weather }
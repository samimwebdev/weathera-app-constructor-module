
import { Weather } from "./Weather";

function Store() {
  const weather = new Weather()
  const $this = this
  this.city = ''
  this.country = ''
  this.defaultCity = 'Gazipur'
  this.defaultCountry = 'BD'

  //geting data from local storage
  /*--------------------------
  As getLocation function is called in plain format inside the getLocation function 'this' refers to window object.so we got the reference of this from correct location and use inside the function
-----------------------------------*/
  const getLocation = function () {
    if (localStorage.getItem('city') === null) {
      $this.city = $this.defaultCity
    } else {
      $this.city = localStorage.getItem('city')
    }

    if (localStorage.getItem('country') === null) {
      $this.country = $this.defaultCountry
    } else {
      $this.country = localStorage.getItem('country')
    }

    return {
      city: $this.city,
      country: $this.country
    }
  }
  // setting data to local storage
  this.setLocation = function (city, country) {
    localStorage.setItem('city', city)
    localStorage.setItem('country', country)
  }

  this.printingDataFromLocalStorage = function () {
    const { city, country } = getLocation()
    weather.city = city
    weather.country = country
  }
}


export { Store }
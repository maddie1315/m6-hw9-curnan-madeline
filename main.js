var formEl = document.querySelector('form')
var inputEl = document.querySelector('input')
var locationEl = document.querySelector('div')

formEl.onsubmit = function(e) {
    e.preventDefault()
    var locationQuery = inputEl.value
    if (!locationQuery) return
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + locationQuery + '&units=imperial&appid=527edf7e9e6fdbe4864629421a705d0e')
    .then(function(result) {
        return result.json()
    })
    .then(function(result) {
        console.log(result)
        renderLocation(result)
        inputEl.value = ""
    })
    .catch(function(err) {
        console.log(err)
    })
}

function renderLocation(locationObj) {
    // locationEl.innerHTML = ""
    if (locationObj.Response === 'False') {
        locationEl.textContent = "Location not Found"
        return
    }

    // city name
    var cityEl = document.createElement('h2')
    cityEl.textContent = locationObj.name
    // locationEl.appendChild(cityEl)

    // weather icon
    var iconEl = document.createElement('img')
    
    // current weather
    var weatherEl = document.createElement('h4')
    weatherEl.textContent = locationObj.weather[0].description
    // locationEl.appendChild(weatherEl)
    
    // current temp
    var tempEl = document.createElement('p')
    tempEl.textContent = "Current Temperature: " + locationObj.temp
    // locationEl.appendChild(tempEl)

    // feels like temp
    var feelsLikeEl = document.createElement('p')
    feelsLikeEl.textContent = "Feels Like: " + locationObj.main.feels_like

}

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
    locationEl.innerHTML = ""
    if (locationObj.message === 'city not found') {
        locationEl.textContent = "Location not Found"
        return
    }

    console.log(locationObj.name)

    // city name
    var city = document.createElement('h2')
    city.textContent = locationObj.name + ", " + locationObj.sys.country
    locationEl.appendChild(city)

    // weather icon
    var icon = document.createElement('img')
    icon.src = 'https://openweathermap.org/img/wn/' + locationObj.weather[0].icon + '@2x.png'
    icon.alt = locationObj.weather[0].description
    locationEl.appendChild(icon)

    // current weather
    var weather = document.createElement('h4')
    weather.textContent = locationObj.weather[0].description
    locationEl.appendChild(weather)
    
    // current temp
    var temp = document.createElement('p')
    temp.textContent = "Current Temperature: " + locationObj.main.temp
    locationEl.appendChild(temp)

    // feels like temp
    var feelsLike = document.createElement('p')
    feelsLike.textContent = "Feels Like: " + locationObj.main.feels_like
    locationEl.appendChild(feelsLike)

}

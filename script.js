
const apiKey = "fb3ca3d4a41c73fdf5013f2563d02016"
const searchInput = document.getElementById("search")
const searchList = document.getElementById("search-list")
const selectedCity = document.getElementById("selected-city")
const dayTemperature = document.getElementById("day-temperature")
const date = document.getElementById("date")
const cities = await getCities()
const lang = navigator.language

async function getCities() {
    const response = await fetch("/city.list.json")
    const data = await response.json()
    return data
}

function filterCities(cities, value){
    return cities.filter(city => {
        return city.name.toLowerCase().includes(value.toLowerCase())
    })
}

function renderCity(city){
    const cityEl = document.createElement("div")
    const countryEl = document.createElement("span")
    cityEl.textContent = city.name
    countryEl.textContent = city.country
    cityEl.appendChild(countryEl)
    
    cityEl.addEventListener("click", async function(){
        selectedCity.textContent = city.name + ", " + city.country
        const weather = await getWeather(city)
        renderWeather(weather)
        clear()
    })

    return cityEl
}

function clear () {
    searchInput.value = ""
    searchList.innerHTML = ""
}

function search(){
    const citiesFilter = filterCities(cities, searchInput.value)
    searchList.innerHTML = ""
    citiesFilter.slice(0, 10).forEach(city => {
        searchList.appendChild(renderCity(city))
    })
}

searchInput.addEventListener("keypress", search)

async function getWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${apiKey}&units=metric`)
    const data = await response.json()
    return data
}

function renderWeather(weather) {
    const weatherData = formatWeatherData(weather, lang)
    dayTemperature.textContent = weatherData.temperature
    date.textContent = weatherData.dateText
    
    console.log(weather)
}

function formatWeatherData(weather, lang) {
    const d = new Date(weather.list[0].dt * 1000)
    const adjustedTime = new Date(d.getTime() + d.getTimezoneOffset() * 60000)

    const dayName = adjustedTime.toLocaleDateString(lang, { weekday: "long" })
    const monthName = adjustedTime.toLocaleDateString(lang, { month: "long" })
    const time = adjustedTime.toLocaleTimeString(lang).replace(/:\d{2}(?=\s|$)/, "")

    const formattedDate = `${adjustedTime.getDay()}. ${monthName} | ${time}`
    
    return {
        temperature: weather.list[0].main.temp,
        dateText: `${dayName}, ${formattedDate}`
    }
}



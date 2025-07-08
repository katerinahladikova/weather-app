
const apiKey = "fb3ca3d4a41c73fdf5013f2563d02016"
const searchInput = document.getElementById("search")
const searchList = document.getElementById("search-list")
const selectedCity = document.getElementById("selected-city")
const dayTemperature = document.getElementById("day-temperature")
const cities = await getCities()

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
    searchList.appendChild(cityEl)
    cityEl.textContent = city.name
    countryEl.textContent = city.country
    cityEl.appendChild(countryEl)
    
    cityEl.addEventListener("click", function(){
        selectedCity.textContent = city.name + ", " + city.country
        getWeather(city)
    })
}

function search(){
    const citiesFilter = filterCities(cities, searchInput.value)
    searchList.innerHTML = ""
    citiesFilter.slice(0, 10).forEach(city => renderCity(city))
}

searchInput.addEventListener("keypress", search)

function getWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${apiKey}&units=metric`)
    .then (request => request.json())
    .then (function(data) {    })
}
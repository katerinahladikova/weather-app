
const apiKey = "fb3ca3d4a41c73fdf5013f2563d02016"
const searchInput = document.getElementById("search")
const searchList = document.getElementById("search-list")
const selectedCity = document.getElementById("selected-city")
const dayTemperature = document.getElementById("day-temperature")
let currentCity = null
let cities = []


fetch("/city.list.json")
.then (request => request.json())
.then (data => cities = data)

searchInput.addEventListener("keypress", function() {
    const citiesFilter = 
        cities.filter(city => {
            return city.name.toLowerCase().includes(searchInput.value.toLowerCase())
        })
    
    searchList.innerHTML = ""
    citiesFilter.slice(0, 10).forEach(city => {
        const cityEl = document.createElement("div")
        const countryEl = document.createElement("span")
        searchList.appendChild(cityEl)
        cityEl.textContent = city.name
        countryEl.textContent = city.country
        cityEl.appendChild(countryEl)

        cityEl.addEventListener("click", function(){
            currentCity = city
            selectedCity.textContent = city.name + ", " + city.country
            getWeather()
        })

    })
})

function getWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${currentCity.coord.lat}&lon=${currentCity.coord.lon}&appid=${apiKey}&units=metric`)
    .then (request => request.json())
    .then (function(data) {
        
    })


}



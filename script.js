
const apiKey = "fb3ca3d4a41c73fdf5013f2563d02016"
const searchInput = document.getElementById("search")
const searchList = document.getElementById("search-list")
const selectedCity = document.getElementById("selected-city")
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
        })

    })
})


const apiKey = "fb3ca3d4a41c73fdf5013f2563d02016"
const searchInput = document.getElementById("search")
const searchList = document.getElementById("search-list")
const selectedCity = document.getElementById("selected-city")
const dayTemperature = document.getElementById("day-temperature")
const humidity = document.getElementById("climate-humi")
const feels = document.getElementById("climate-feels")
const wind = document.getElementById("climate-wind")
const forecastDays = document.getElementById("forecast-days")
const date = document.getElementById("date")
const forecast = document.getElementById("forecast")
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
        renderForecast(weather)
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
    const weatherData = formatWeatherData(weather.list[0], lang)
    dayTemperature.textContent = Math.round(weatherData.temperature) + " °C"
    wind.textContent = weatherData.wind + " m/s"
    humidity.textContent = weatherData.humidity + "%"
    feels.textContent = Math.round(weatherData.feels) + " °C"
    date.textContent = weatherData.dateText
}

function getDailyWeather(weather) {
    const result = []
    for (let i = 0; i < weather.length; i++) {
        const data = formatWeatherData(weather[i])
        const filteredData = result.filter(function(day){
            return day.day === data.date.getDate()
        })
        if (filteredData.length === 0) {
            result.push({
                day: data.date.getDate(),
                data: [data]
            })
        } else {
            filteredData[0].data.push(data)
        }
    }
    return result
}

function formatWeatherData(weather, lang) {
    const d = new Date(weather.dt * 1000)
    const adjustedTime = new Date(d.getTime() + d.getTimezoneOffset() * 60000)

    const dayName = adjustedTime.toLocaleDateString(lang, { weekday: "long" })
    const monthName = adjustedTime.toLocaleDateString(lang, { month: "long" })
    const time = adjustedTime.toLocaleTimeString(lang).replace(/:\d{2}(?=\s|$)/, "")

    const formattedDate = `${adjustedTime.getDate()}. ${monthName}`
    
    return {
        temperature: weather.main.temp,
        dateText: `${dayName}, ${formattedDate} | ${time}`,
        icon: weather.weather[0].icon,
        dateTextNoTime: `${dayName}, ${formattedDate}`,
        date: adjustedTime,
        wind: weather.wind.speed,
        humidity: weather.main.humidity,
        feels: weather.main.feels_like
    }
}

function renderForecast (weather) {
    forecastDays.innerHTML = ""
    const filteredDates = weather.list.filter(function(data){
        const forecastData = formatWeatherData(data)
        return forecastData.date.getHours() === 0 || forecastData.date.getHours() === 15
    })
    console.log(filteredDates)
    const dailyWeather = getDailyWeather(filteredDates)
    for (let i = 0; i < dailyWeather.length; i++) {
        forecastDays.appendChild(createForecastDay(dailyWeather[i]))
    }
}

function createForecastDay(weather) {
    const frameDate = document.createElement("div")
    frameDate.classList.add("frameDate")
    const frameTemp = document.createElement("div")
    frameTemp.classList.add("frameTemp")
    const forecastDate = document.createElement("div")
    const forecastDay = document.createElement("div")
    const tempDay = document.createElement("div")
    const tempNight = document.createElement("div")
    const forecastIcon = document.createElement("img")

    forecastDay.textContent = weather.data[0].dateTextNoTime
    tempDay.textContent = Math.round(weather.data[0].temperature) + " °C"
    tempNight.textContent = Math.round(weather.data[1].temperature) + " °C"
    forecastIcon.src = `https://openweathermap.org/img/wn/${weather.data[1].icon}@2x.png`
    forecastDate.append(frameDate, frameTemp)
    frameTemp.append(tempDay, tempNight)
    frameDate.append(forecastIcon, forecastDay)

    return forecastDate
}





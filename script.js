
const apiKey = "fb3ca3d4a41c73fdf5013f2563d02016"
const searchInput = document.getElementById("search")
let cities = []


fetch("/city.list.json")
.then (request => request.json())
.then (data => cities = data)

searchInput.addEventListener("keypress", function() {
    console.log(cities.filter(city => {
        return city.name.toLowerCase().includes(searchInput.value.toLowerCase())
    }))
})


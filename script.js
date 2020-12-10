let city = "Salt Lake City"
let units = "imperial"
let apiID = ""
let TempDataStore = null



getCityWeather(city, units, apiID)
fiveDayForcast(city, units, apiID)
searchButton()

function searchButton() {
    let sButton = document.querySelector("#search-btn")
    sButton.addEventListener("click", function(event) {
        event.preventDefault()
        console.log("search button pressed")
        let searchColumn = document.querySelector(".search-column")
        let searchedCityButton = document.createElement("button")
        searchedCityButton.setAttribute("class",'btn btn-primary')
        searchedCityButton.innerText = document.getElementById("search-box").value
        searchColumn.appendChild(searchedCityButton)
    })
}


function getCityWeather(city, units, apiID) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiID}&units=${units}`)
        .then(response => {

            if (response.ok) {
                return (response.json())
            } else {
                throw new error("The call was not completed succesfully")
            }


        })
        .then(data => {
            jsonHandler(data)
            return data
        })
        .catch(error => console.log('error', error));

}

function jsonHandler(data) {
    //console.log(data)
    TempDataStore = data
    let city = data.name
    let temp = data.main.temp
    let currentWeather = document.getElementById("current-weather")
    let element = document.createElement("p")
    currentWeather.appendChild(element)
    element.innerHTML = (`City: ${city},${data.sys.country} <br> Tempreture: ${temp} F <br> WindSpeed: ${data.wind.speed} MPH`)


}

function fiveDayForcast(city, units, apiID) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiID}&units=${units}`)
        .then(response => {
            if (response.ok) {
                return (response.json())
            } else {
                throw new error("Call did not complete succesfully")
            }


        })
        .then(data => {
            fiveDayJson(data)

        })
        .catch(error => console.log('error', error));

}

function fiveDayJson(data) {
    TempDataStore = data

    let fiveDay = document.querySelector("#forcast")

    //let dayDiv = document.createElement("div")

    for (let i = 0; i < data.list.length; i = i + 8) {
        //console.log(TempDataStore.list[i].dt_txt)

        let p = document.createElement("p")
        fiveDay.appendChild(p)
        p.innerHTML = (`Date ${data.list[i].dt_txt} <br> Min Temp: ${data.list[i].main.temp_min} <br> Max Temp: ${data.list[i].main.temp_max} <br> Humidity: ${data.list[i].main.humidity}%`)
        
    }

}
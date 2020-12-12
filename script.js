let city = "Salt Lake City"
let units = "imperial"
let apiID = "008c89668171b3ba97713ee1c5229978"
let TempDataStore = null

window.onload = function () {
    //console.log(Object(localStorage))
    searchButton()
    searchHistory()
    getCityWeather(city, units, apiID)
    fiveDayForcast(city, units, apiID)

}


function searchHistory() {

    let keys = Object.keys(localStorage)

    let searchedCities = document.querySelector(".searched-cities")

    // clear items prior to draw
    while (searchedCities.firstChild) {
        searchedCities.removeChild(searchedCities.firstChild)
    }


    for (const elm of keys) {
        console.log(elm)

        let p = document.createElement("p")
        searchedCities.appendChild(p)

        let searchedButton = document.createElement("button")
        searchedButton.setAttribute("class", "btn btn-primary")
        searchedButton.innerText = elm
        p.appendChild(searchedButton)

        searchedButton.addEventListener("click", function () {
            console.log("item clicked")
            getCityWeather(elm, units, apiID)
            fiveDayForcast(elm, units, apiID)

        })

    }
}

function searchButton(city) {

    let sButton = document.querySelector("#search-btn")
    sButton.addEventListener("click", function (event) {
        event.preventDefault()
        console.log("search button pressed")

        city = document.querySelector("#search-box").value
        getCityWeather(city, units, apiID)
        fiveDayForcast(city, units, apiID)

        // add weather to local storage
        localStorage.setItem(city, city)
        searchHistory()


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
    console.log(data)

    let city = data.name
    let temp = data.main.temp
    let icon = data.weather[0].icon
    let currentWeather = document.getElementById("current-weather")
    // clear old results from Dom
    while (currentWeather.firstChild) {
        currentWeather.removeChild(currentWeather.lastChild)
    }

    let currentCard = document.createElement("div")
    currentCard.setAttribute("class", "card weather-card")
    currentWeather.appendChild(currentCard)

    let currentCardBody = document.createElement("div")
    currentCardBody.setAttribute("class", "card-body")
    currentCardBody.innerHTML = (`<h2>${city} Weather <span><img src="https://openweathermap.org/img/wn/${icon}@2x.png"></span></h2><p class="card-text">Tempreture: ${temp} F <br> WindSpeed ${data.wind.speed} MPH</p>`)
    currentCard.appendChild(currentCardBody)

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

    // clear old results from Dom
    while (fiveDay.firstChild) {
        fiveDay.removeChild(fiveDay.lastChild)
    }

    let fiveDayHeader = document.createElement("h1")
    fiveDayHeader.innerText = "5-Day Forecast:"
    fiveDay.appendChild(fiveDayHeader)



    for (let i = 0; i < data.list.length; i = i + 8) {

        let column = document.createElement("div")
        column.setAttribute("class", "col-md forcast-item-holder")
        fiveDay.append(column)

        let card = document.createElement("div")
        card.setAttribute("class", "card five-day-card")
        column.appendChild(card)


        let cardBody = document.createElement("div")
        cardBody.setAttribute("class", "card-body")
        cardBody.innerHTML = (`<h5 class="card-title">${data.list[i].dt_txt} <span><img src="http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png"></span></h5> <p>Min Temp: ${data.list[i].main.temp_min} <br> Max Temp: ${data.list[i].main.temp_max} <br> Humidity: ${data.list[i].main.humidity}%</p>`)
        card.appendChild(cardBody)


    }

}
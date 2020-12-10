let city = prompt("enter your City,", "Salt Lake City")
let units = "imperial"
let apiID = "apikeyhere"
let TempDataStore = null



getCityWeather(city, units, apiID)
fiveDayForcast(city, units, apiID)


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
    let container = document.getElementById("container")
    let element = document.createElement("p")
    container.appendChild(element)
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

    let fiveDay = document.getElementById("#5day")

    let dayDiv = document.createElement("div")
    fiveDay.appendChild(dayDiv)

    for (let i = 0; i < data.list.length; i = i + 8) {
        //console.log(TempDataStore.list[i].dt_txt)

        let p = document.createElement("p")
        dayDiv.appendChild(p)
        p.innerHTML = (TempDataStore.list[i].dt_txt)
    }

}
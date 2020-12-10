let city = prompt("enter your City,", "Salt Lake City")
let units = "imperial"
let apiID = "apiKeyHere"
let TempDataStore = null



getCityWeather(city, units,apiID)
fiveDayForcast(city,units,apiID)


function getCityWeather(city, units,apiID) {
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
    TempDataStore = data
    let city = data.name
    let temp = data.main.temp
    let container = document.getElementById("container")
    let element = document.createElement("p")
    container.appendChild(element)
    element.innerHTML = (`City: ${city},${data.sys.country} <br> Tempreture: ${temp} F <br> WindSpeed: ${data.wind.speed} MPH`)


}

function fiveDayForcast(city,units,apiID) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiID}&units=${units}`)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

}
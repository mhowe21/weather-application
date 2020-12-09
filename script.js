let city = prompt("enter your City,", "Salt Lake City")
let units = "imperial"
let apiID = "fillapikeyhere"
let TempDataStore = null



getCityWeather(city, units)
fiveDayForcast(city,units)


function getCityWeather(city, units) {
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

function fiveDayForcast(city, units) {
    fetch(`api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiID}&units=${units}`)
        .then(response => {
            if (response.ok) {
                return (response.json())
            } else {
                throw new error("The call was not complated succesfully")
            }
        })
        .then(data =>{
            console.log(data)

        })
        .catch(error => console.log("error", error))
}
let city = prompt("enter your City,", "New York")
let units = "imperial"
let apiID = "222e451b939e0663df968edf4cecbd01"
let TempDataStore = null



getCityWeather(city, units)


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

function fiveDayForcast(){
    
}
let city = prompt("enter your City,", "New York")
let units = "imperial"


getCityWeather(city,units)


function getCityWeather(city, units) {

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=222e451b939e0663df968edf4cecbd01&units=${units}`)
        .then(response => {


            if (response.ok) {
                return (response.json())
            }else{
                throw new error ("The call was not completed succesfully")
            }


        })
        .then(data => {
            jsonObjectParse(data)
            return data
        })
        .catch(error => console.log('error', error));

}

function jsonObjectParse(data) {
    console.log(data)
    let container = document.getElementById("container")
    let element = document.createElement("p")
    container.appendChild(element)
    element.innerText = JSON.stringify(data)


}
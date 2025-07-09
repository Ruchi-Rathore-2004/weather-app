const apiKey = "8d6df4b41b560f7ad08726f77e93b96f";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

let counter = 0;
const debouncedfetchWeather = ()=>{
    console.log("Fetching Data..",counter++)
}
   
const debounce = function (fn , d){
    let timer;
    return function(){
        let context = this,
        args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            debouncedfetchWeather.apply(context,args);
        }, d);
    }
}




const searchBox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");


async function checkWeather(city){

    if (!city) {
        console.error('City name is undefined or empty');
        return;
    }
    const response = await fetch(apiUrl + city +`&appid=${apiKey}`);

    if(response.status == 404){
         document.querySelector(".error").style.display = "block";
          document.querySelector(".weather").style.display = "none"
    } else {
        var data = await response.json();

document.querySelector(".city").innerHTML = data.name;
document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
document.querySelector(".humidity").innerHTML = data.main.humidity+"%";
document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

if(data.weather[0].main == "Clouds"){
    weatherIcon.src = "images/clouds.png";
}
else if(data.weather[0].main == "Clear"){
    weatherIcon.src = "images/clear.png";
}
else if(data.weather[0].main == "Rain"){
    weatherIcon.src = "images/rain.png";
}
else if(data.weather[0].main == "Drizzle"){
    weatherIcon.src = "images/drizzle.png";
}
else if(data.weather[0].main == "Mist"){
    weatherIcon.src = "images/mist.png";
}
document.querySelector(".weather").style.display= "block";
document.querySelector(".error").style.display = "none";
  }
}

const betterFunction = debounce(checkWeather,500);

searchbtn.addEventListener("click",()=>{
    debouncedfetchWeather(searchBox.value);
})



searchBox.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        debouncedfetchWeather(searchBox.value);
    }
});



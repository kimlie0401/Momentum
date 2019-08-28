const weather = document.querySelector(".js-weather");

const COORDS = "coords";
const API_KEY = "f849cf6fae84a7be9d063a2c1643b903";
function getWeather(lat, lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=imperial`
        ).then(
            function(response){
                return response.json();
            }).then(
                function(json){
                    const temperture = json.main.temp;
                    const place = json.name;
                    weather.innerText = `${temperture} @ ${place}`;
                });
    
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handelGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("cannot access location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handelGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    }else{
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
        //get weather
    }
}

function init(){
    loadCoords();
}

init();
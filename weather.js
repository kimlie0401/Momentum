const COORDS = "coords";
const API_KEY = "f849cf6fae84a7be9d063a2c1643b903";

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

}

function handleGeoError(){
    console.log("cannot access location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handelGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedcords = localStorage.getItem(COORDS);
    if (loadedcords === null) {
        askForCoords();
    }else{
        //get weather
    }
}

function init(){
    loadCoords();
}

init();
const weatherUrl = "http://api.weatherapi.com/v1/forecast.json?key=bba6bfabf09e47e886940311262410&q=Calgary&days=3&aqi=no&alerts=no"

//Create function to recieve weather data
async function getWeather(){
    const response = await fetch(weatherUrl);
    const data = await response.json();
    //retrieve data for forecast
    const forecastDay = data.forecast.forecastday;
    console.log(forecastDay);
}
getWeather();


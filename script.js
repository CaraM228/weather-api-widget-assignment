const weatherUrl = "http://api.weatherapi.com/v1/forecast.json?key=bba6bfabf09e47e886940311262410&q=Calgary&days=3&aqi=no&alerts=no"

//Create function to recieve weather data
async function getWeather(){
    const response = await fetch(weatherUrl);
    const data = await response.json();
    //Variables for forecast and cards
    const forecastDays = data.forecast.forecastday;
    console.log(forecastDays);
    const cards = document.querySelectorAll(".weather-card");
    console.log(cards);

//Variable for days of the week
const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    ];

//Connect data to card
forecastDays.forEach((day, index) => {
    //Variables for day of the week and date
    const card = cards[index];
    const date = new Date(day.date);
    const dayName = daysOfWeek[date.getDay()];

    //Day of the week
    card.querySelector(".day").textContent = dayName;
    //Date
    card.querySelector(".date").textContent = day.date;
    //Temperature
    card.querySelector(".temp").textContent = `${day.day.avgtemp_c}°C`;
    //Condtition
    card.querySelector(".condition").textContent = day.day.condition.text;
});
}
getWeather();
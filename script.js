const weatherUrl = "https://api.weatherapi.com/v1/forecast.json?key=bba6bfabf09e47e886940311262410&q=Calgary&days=3&aqi=no&alerts=no"

let celsius = true;

//Create function to recieve weather data
async function getWeather(){
    try {
        const response = await fetch(weatherUrl);

        if(!response.ok) {
            throw new Error("Error! Weather data could not be loaded.");
        }

        const data = await response.json();
        const forecastDays = data.forecast.forecastday;
        const cards = document.querySelectorAll(".weather-card");
        console.log(cards);

        const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        ];

        //Connect weather data to each card
        forecastDays.forEach((day, index) => {
            const card = cards[index];
            const date = new Date(day.date);
            const dayName = daysOfWeek[date.getDay()];

            card.querySelector(".day").textContent = dayName;
            card.querySelector(".date").textContent = day.date;

            if(celsius){
            card.querySelector(".temp").textContent = `${day.day.avgtemp_c}°C`;
            }else{
            card.querySelector(".temp").textContent = `${day.day.avgtemp_f}°F`;
            }
            card.querySelector(".condition").textContent = day.day.condition.text;

            //Conditional statements for icons
            const icon = card.querySelector(".weather-icon");
            const condition = day.day.condition.text;
            console.log(day.day.condition.text)

            if (condition === "Light snow" ||
            condition === "Moderate snow" ||
            condition === "Heavy snow") {
            icon.src = "./icons/snow.svg";
            }
            else if (
            condition === "Cloudy" ||
            condition === "Partly cloudy" ||
            condition === "Overcast"
            ) {
            icon.src = "./icons/cloud.svg";
            }
            else if(condition === "Light rain" ||
            condition === "Moderate rain" ||
            condition === "Heavy rain"){
            icon.src = "./icons/rain.svg";
            }
            else {
            icon.src = "./icons/sunny.svg";
            }
        });
} catch (error) {
    console.error(error);
    document.getElementById("error-message").textContent = "Error! Unable to load weather data.";
    }
}
getWeather();

//Create toggle function with button
const toggleBtn = document.getElementById("toggle-btn");

toggleBtn.addEventListener("click", () => {
    celsius = !celsius;
    getWeather();
})
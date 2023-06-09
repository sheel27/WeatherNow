const API_KEY = "9ae3268955f3157199939178fbd1b77f";

const makeIconURL = (iconId) =>
  `https://openweathermap.org/img/wn/${iconId}@2x.png`;

const getFormattedWeatherData = async (city, units = "metric") => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

  try {
    const response = await fetch(URL);
    const data = await fetch(URL)
    .then((res) => res.json())
    .then((data) => data);

    if (response.ok) {
      const {
        weather,
        main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
        wind: { speed },
        sys: { country, sunrise, sunset },
        name,
      }  = data;

      const { description, icon } = weather[0];

      const sunriseTime = new Date(sunrise * 1000); 
      const sunsetTime = new Date(sunset * 1000); 

      return {
        description,
        iconURL: makeIconURL(icon),
        temp,
        feels_like,
        temp_min,
        temp_max,
        pressure,
        humidity,
        speed,
        country,
        name,

        sunrise: sunriseTime.toLocaleTimeString(), 
        sunset: sunsetTime.toLocaleTimeString(), 
      };
  } else {
  console.error("API request failed:", data.message);
  return null; 
  }
  }   catch (error) {
// Handle fetch errors
console.error("Error fetching data:", error);
return null; 
}
};

export { getFormattedWeatherData };

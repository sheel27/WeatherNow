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

      const sunriseTime = new Date(sunrise * 1000); // Convert UNIX timestamp to JavaScript Date object
      const sunsetTime = new Date(sunset * 1000); // Convert UNIX timestamp to JavaScript Date object

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

        sunrise: sunriseTime.toLocaleTimeString(), // Format sunrise time as a string
        sunset: sunsetTime.toLocaleTimeString(), // Format sunset time as a string
      };
  } else {
  // Handle API errors
  console.error("API request failed:", data.message);
  return null; // Return null when data is not available
  }
  }   catch (error) {
// Handle fetch errors
console.error("Error fetching data:", error);
return null; // Return null when data is not available
}
};

export { getFormattedWeatherData };

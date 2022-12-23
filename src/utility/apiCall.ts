export const apiCall = async (city: string) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${
      city || "london"
    }&appid=546b8e7bc2e42c8c92a2572386d39b0a&units=metric`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((result) => {
      //   console.log(result);
      //   setWeather(result);
      return result;
    });
  return res;
};

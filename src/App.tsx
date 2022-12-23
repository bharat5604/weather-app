import { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import "./App.css";

type weatherData = {
  name: string;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: [
    {
      description: string;
    }
  ];
};

function App() {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<weatherData>();
  const [loader, setLoader] = useState<boolean>(false);

  const handleWeather = async (e: any | undefined) => {
    e.preventDefault();
    setLoader(true);
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${
        city || "london"
      }&appid=546b8e7bc2e42c8c92a2572386d39b0a&units=metric`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setWeather(result);
        setLoader(false);
      });
  };

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${"london"}&appid=546b8e7bc2e42c8c92a2572386d39b0a&units=metric`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setWeather(result);
        setLoader(false);
      });
  }, []);

  return (
    <div className="flex justify-center">
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-full lg:w-1/2 mx-auto py-6 px-4 lg:px-12 rounded-md rounde-xl">
        <h1 className="text-white text-5xl text-center font-bold">
          Weather in
        </h1>
        <form action="" className="my-6 relative" onSubmit={handleWeather}>
          <input
            type="text"
            placeholder="Search Weather"
            className="py-3 w-full rounded-xl px-2"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          {loader && (
            <i className="fa fa-spinner absolute right-2 top-2 fa-spin text-2xl"></i>
          )}
        </form>

        <div className="p-5 rounded-xl bg-white text-center">
          <h2 className="text-3xl font-bold capitalize">{weather?.name}</h2>
          <div className="flex lg:w-1/2 mx-auto justify-between mt-6 text-xl fon-bold">
            <h3>{Math.round(weather?.main?.temp || 0)}&deg;C</h3>
            <div className="capitalize">
              <h3 className="font-semibold">
                {weather?.weather[0]?.description}
              </h3>
              <p>Max: {Math.round(weather?.main.temp_max || 0)}&deg;C</p>
              <p>Min: {Math.round(weather?.main.temp_min || 0)}&deg;C</p>
            </div>
          </div>
          <div className=" mx-auto text-center rounded-full p-10 ">
            <img
              src="https://openweathermap.org/img/wn/50d@2x.png"
              className=" block mx-auto rounded-xl"
              alt=""
            />
          </div>
          <div className="flex lg:w-1/2 mx-auto justify-between">
            <div className="text-xl ">
              <h2 className="font-bold">
                {Math.round(weather?.main?.feels_like || 0)}&deg;C
              </h2>
              <span>feels like</span>
            </div>
            <div className="text-xl">
              <h2 className="font-bold">
                {Math.round(weather?.main?.humidity || 0)}%
              </h2>
              <span>Humidity</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

const BASE_URL = 'https://api.openweathermap.org/';
const URL_ICON = `https://openweathermap.org/img/wn`;
const API_KEY = process.env.NEXT_PUBLIC_APIKEY;
import { respuesta } from './fake-response';

function urlIcon(code) {
  return `${URL_ICON}/${code}@2x.png`;
}

async function getAllData(lat, lon) {

  const data = await fetch(
    `${BASE_URL}data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${API_KEY}&units=metric`
  )
    .then((resp) => resp.json())
    .then((data) => {
      //GET DAILY DATA
      const res_daily = data.daily.slice(0, 5).map((w) => {
        return {
          time: new Date(w.dt * 1000),
          weather: w.weather,
          temp: w.temp.day,
          url_icon: urlIcon(w.weather[0].icon),
        };
      });

      //GET HOURLY DATA
      const res_hourly = data.hourly.slice(0, 5).map((w) => {
        return {
          time: new Date(w.dt * 1000),
          weather: w.weather,
          temp: w.temp,
          url_icon: urlIcon(w.weather[0].icon),
        };
      });

      //GET TODAY DATA
      const { daily, timezone, current } = data;
      const today = {
        lat: lat,
        lon: lon,
        wind_speed: current.wind_speed,
        sunset: new Date(current.sunset * 1000),
        sunrise: new Date(current.sunrise * 1000),
        url_icon: urlIcon(current.weather[0].icon),
        name: current.weather[0].main,
        now: new Date(current.t * 1000),
        weather: current.weather[0],
        humidity: current.humidity,
        temp: current.temp,
        feels_like: daily[0].feels_like,
        temp_min: daily[0].temp_min,
        temp_max: daily[0].temp_max,
        pressure: daily[0].pressure,
        timezone: timezone / 3600,
      };

      return { daily: res_daily, hourly: res_hourly, today };
    })
    .catch((erro) => erro);
  return data;
}

async function getLanLon(city) {
  const data1 = await fetch(`${BASE_URL}data/2.5/weather?q=${city}&appid=${API_KEY}`)
    .then((resp) => resp.json())
    .then((data) => [data.coord.lat, data.coord.lon , data.name])
    .catch((erro) => { throw new Error("City doesnt exist")});
  return data1;
}

async function getDayData(lat, lon) {
 try {
  const data1 = await fetch(
    `${BASE_URL}data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then((resp) => resp.json())
    .then((data) => {

      if(data.cod!== 200)
        throw new Error("Failed loading API")

      const { coord, wind, sys, timezone, name, main, weather, dt } = data;
      const parsedData = {
        lat: coord?.lat,
        lon: coord?.lon,
        wind_speed: wind.speed,
        sunset: new Date(sys.sunset * 1000),
        sunrise: new Date(sys.sunrise * 1000),
        url_icon: urlIcon(weather[0].icon),
        name,
        now: new Date(dt * 1000),
        weather: weather[0],
        humidity: main.humidity,
        temp: main.temp,
        feels_like: main.feels_like,
        temp_min: main.temp_min,
        temp_max: main.temp_max,
        pressure: main.pressure,
        timezone: timezone / 3600,
      };

      return parsedData;
    })
    .catch((erro) => {
      throw  erro;
    });
    return data1;
 } catch (error) {
    throw error;  
}
  
}
async function getDayHourData(lat, long) {
  const data = await fetch(
    `${BASE_URL}onecall?lat=${lat}&lon=${long}&exclude=minutely,alerts,current&appid=${API_KEY}&units=metric`
  )
    .then((resp) => resp.json())
    .catch((erro) => console.log(erro));


  // const data = respuesta;
  const result = data.hourly.map((w) => {
    return {
      time: new Date(w.dt * 1000),
      weather: w.weather,
      temp: w.temp,
      url_icon: urlIcon(w.weather[0].icon),
    };
  });
  // console.log({ result });
  return result.slice(1, 6);
}

async function getDailyData(lat, long) {
  const data = await fetch(
    `${BASE_URL}onecall?lat=${lat}&lon=${long}&exclude=minutely,alerts,current&appid=${API_KEY}&units=metric`
  )
    .then((resp) => resp.json())
    .catch((erro) => console.log(erro));

  // const data = respuesta;
  const result = data.daily.map((w) => {
    return {
      time: new Date(w.dt * 1000),
      weather: w.weather,
      temp: w.temp.day,
      url_icon: urlIcon(w.weather[0].icon),
    };
  });
  return result.slice(1, 6);
}

export { getDayData, getDayHourData, getDailyData, getLanLon , getAllData };

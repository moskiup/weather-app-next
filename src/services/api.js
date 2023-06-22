const BASE_URL = 'http://api.openweathermap.org/data/2.5/';
const API_KEY = process.env.API_KEY;

function urlIcon(code) {

  const list_images = {
    mist: 'mist.svg',
    clear: 'clear-sky.svg',
    drizzle: 'drizzle.svg',
    fewcloud: 'few-cloud.svg',
    overcast: 'overcast-cloud.svg',
    rain: 'rain.svg',
    snow: 'snow.svg',
    thunderstorm: 'thunderstorm.svg',
  };

  const list_codes = {
    '50d': list_images.mist,
    '01d': list_images.clear,
    '52d': list_images.drizzle,
    '53d': list_images.fewcloud,
    '04d': list_images.overcast,
    '10d': list_images.rain,
    '56d': list_images.snow,
    '57d': list_images.thunderstorm,
    default: list_images.clear,

    // 'http://openweathermap.org/img/wn/${code}@2x.png'
  };
  // if (list_codes[code] === undefined) console.log(code);

  const url = `http://openweathermap.org/img/wn/${code}@2x.png`;
  // list_codes[code] === undefined
  //   ? `/img/${list_codes[code]}`
  //   : `http://openweathermap.org/img/wn/${code}@2x.png`;

  return url;
}

async function getAllData() {
  const data = await fetch(
    `${BASE_URL}weather?lat=${lat}&lon=${long}&exclude=minutely,alerts&appid=${API_KEY}&units=metric`
  )
    .then((resp) => resp.json())
    .then((data) => data)
    .catch((erro) => console.log(erro));
}

async function getDayData(lat, long) {
  const data1 = await fetch(
    `${BASE_URL}weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
  )
    .then((resp) => resp.json())
    .then((data) => data)
    .catch((erro) => console.log(erro));

  const { coord, wind, sys, timezone, name, main, weather, dt } = data1;
  const parsedData = {
    lat: coord.lat,
    lon: coord.lon,
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

  return { ...parsedData };
}
async function getDayHourData(lat, long) {
  const data = await fetch(
    `${BASE_URL}onecall?lat=${lat}&lon=${long}&exclude=minutely,alerts,current&appid=${API_KEY}&units=metric`
  )
    .then((resp) => resp.json())
    .catch((erro) => console.log(erro));

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

export { getDayData, getDayHourData, getDailyData };

const data2 = {
  coord: {
    lon: -103.3333,
    lat: 20.6667,
  },
  weather: [
    {
      id: 721,
      main: 'Haze',
      description: 'haze',
      icon: '50d',
    },
    {
      id: 711,
      main: 'Smoke',
      description: 'smoke',
      icon: '50d',
    },
  ],
  base: 'stations',
  main: {
    temp: 36.1,
    feels_like: 34.31,
    temp_min: 34.87,
    temp_max: 36.1,
    pressure: 1018,
    humidity: 20,
  },
  visibility: 4828,
  wind: {
    speed: 2.06,
    deg: 140,
  },
  clouds: {
    all: 0,
  },
  dt: 1687378326,
  sys: {
    type: 2,
    id: 268566,
    country: 'MX',
    sunrise: 1687349609,
    sunset: 1687397798,
  },
  timezone: -21600,
  id: 4005539,
  name: 'Guadalajara',
  cod: 200,
};

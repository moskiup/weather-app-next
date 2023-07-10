import { useState, useEffect } from 'react';
import { getAllData, getDayData, getLanLon } from '@/services/api';
import { useLocalStorage } from './useLocalStore';
import { get as getcache, set as setcache } from './useCache';
import { useMyContext } from '@/context/myContext';

let cities_latlon = {};
const timecache = 5 * 3600;

export function useWeather() {
  const { updateContext, gps, cities , isMetric } = useMyContext();

  const [lisMetric, localsetIsMetric] = useLocalStorage('metric', true);
  const [lcities, lsetCities] = useLocalStorage('cities', [
    'mexico city',
    'sydney',
    'new york',
    'london',
    'tokyo',
  ]);
  let city = '';

  //LOAD CONFIGURATION
  useEffect(() => {
    console.warn(lcities)
    updateContext({ cities: lcities, isMetric: lisMetric  , setCity : setCity});
    setCity(lcities[0], false);
  }, []);

  useEffect(()=> {
    localsetIsMetric(isMetric);
  } , [isMetric]);

  //CHANGING CITY
  useEffect(() => {
    const today_data = async () => {
      try {
        updateContext({ isLoading: true });
        const cache_daily = `d${gps.lat},${gps.lon}`;
        const cache_today = `t${gps.lat},${gps.lon}`;
        const cache_hourly = `h${gps.lat},${gps.lon}`;
        if (getcache(cache_daily) === undefined) {
          const prom1 = getDayData(gps.lat, gps.lon);
          const prom4 = getAllData(gps.lat, gps.lon);

          Promise.all([prom1, prom4])
            .then((values) => {
              setcache(cache_today, values[0], timecache);
              setcache(cache_hourly, values[1].hourly, timecache);
              setcache(cache_daily, values[1].daily, timecache);
              
              const weather = {
                today: values[0],
                hourly: values[1].hourly,
                daily: values[1].daily,
              };
              updateContext({ isLoading: false, weatherResponse: weather });
            })
            .catch((error) => {
              throw error;
            });
        } else {
          // const today = await getDayData(gps.lat, gps.lon);
          const weather_data = {
            today: getcache(cache_today),
            hourly: getcache(cache_hourly),
            daily: getcache(cache_daily),
          };
          updateContext({ isLoading: false, weatherResponse: weather_data });

          // setToday(getcache(cache_today));
          // setHourly(getcache(cache_hourly));
          // setDaily(getcache(cache_daily));
        }
      } catch (err) {
        console.error(err);
        setError(err);
        updateContext({ isLoading: false });

        setLoading(false);
      } finally {
      }
    };
    if (gps.lat !== 0 && gps.lon !== 0) today_data();
  }, [gps]);


  async function setCity(_city, firstTime = false) {
    _city = _city.toLowerCase();

    try {
      if (_city === city && !firstTime) return;

      if (_city !== '') {
        if (cities_latlon[_city] === undefined) {
          const resp = await getLanLon(_city);
          cities_latlon[_city] = { lat: resp[0], lon: resp[1]  , cityname : resp[2]};
        }
        console.warn(cities)
        if (cities.lenght> 0 && _city !== cities[0]) {

          const newCities = cities.filter((x) => x !== _city);
          updateContext({ cities: [_city, ...newCities] });
          lsetCities([_city , ...newCities])
        }

        updateContext({ gps: cities_latlon[_city]  ,debug:true});

        city = _city;
      }
    } catch (error) {
      updateContext({error})
    }
  }

  return {setCity};
}

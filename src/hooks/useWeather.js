import { useState, useEffect } from 'react';
import { getAllData, getDailyData, getDayData, getDayHourData, getLangLong  } from '@/services/api';
import { useLocalStorage } from './useLocalStore';
import { get as getcache, set as setcache } from './useCache';

let cities_latlon = {};
const timecache = 5*3600;


export function useWeather() {
  const [today, setToday] = useState({});
  const [hourly, setHourly] = useState(null);
  const [daily, setDaily] = useState(null);
  const [error, setError] = useState(null);
  const [isMetric, setIsMetric] = useState(true);
  const [lisMetric, localsetIsMetric] = useLocalStorage('metric', true);

  const [isLoading, setLoading] = useState(true);
  const [gps, setGps] = useState({lat:0, lon:0});
  const [cities, setCities] = useState(['mexico city', 'sydney', 'new york', 'london', 'tokio']);
  const [lcities, lsetCities] = useLocalStorage('cities', [
    'mexico city',
    'sydney',
    'new york',
    'london',
    'tokio',
  ]);
  let city = '';


  console.log("rerender");
  //LOAD CONFIGURATION
  useEffect(() => {
    setCities(lcities);
    setCity(lcities[0], true);
    setIsMetric(lisMetric);
  }, []);

  //CHANGING CITY
  useEffect(() => {
    const today_data = async () => {
      try {
        setLoading(true);

        const cache_today = `t${gps.lat},${gps.lon}`;
        const cache_daily = `d${gps.lat},${gps.lon}`;
        const cache_hourly = `h${gps.lat},${gps.lon}`;
        
        if (getcache(cache_today) === undefined) {
          const prom1 = getDayData(gps.lat, gps.lon, isMetric);
          const prom4 = getAllData(gps.lat , gps.lon);

          Promise.all([prom1,  prom4])
          .then((values) => {
            
            if (getcache(cache_today) === undefined) setcache(cache_today, values[0], timecache);
            if (getcache(cache_hourly) === undefined) setcache(cache_hourly, values[1], timecache);
            if (getcache(cache_daily) === undefined) setcache(cache_daily, values[2], timecache);

              setToday(values[0]);
              setHourly(values[1].hourly);
              setDaily(values[1].daily);
            })
            .catch((error) => {
              throw error;
            });
        }
        else {
          setToday(getcache(cache_today));
          setHourly(getcache(cache_hourly));
          setDaily(getcache(cache_daily));

        } 
      } catch (err) {
        console.error(err)
        setError(err);
      }finally{
        setLoading(false);
      }

    };
    if(gps.lat !== 0 && gps.lon !== 0)
      today_data();
  }, [gps]);

  function changeUnits(val) {
    setIsMetric(val);
    localsetIsMetric(val);
  }

  async function setCity(_city, fisrtTime = false) {

    _city = _city.toLowerCase();

    try {
    
      if (_city === city && !fisrtTime) return;
      if (_city !== '' || fisrtTime) {
        if (cities[0] !== _city) {
          if (!fisrtTime) {
            setCities((prev) => [_city, ...prev.filter((x) => x !== _city).slice(0, 4)]);
            lsetCities([_city, ...cities.filter((x) => x !== _city).slice(0, 4)]);
          }
        }
        if (cities_latlon[_city] === undefined) {
          const data3 = await getLangLong(_city);
          cities_latlon[_city] = { lat: data3[0], lon: data3[1] };
        }

        setGps(cities_latlon[_city]);
        city = _city;
      }
    } catch (error) {
      setError(error);
    }
  }

  return {
    today,
    hourly,
    daily,
    isLoading,
    error,
    isMetric,
    changeUnits,
    setCity,
    setGps,
    cities,
  };
}

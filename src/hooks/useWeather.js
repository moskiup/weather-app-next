import { useState, useEffect } from 'react';
import { getDailyData, getDayData, getDayHourData, getLangLong } from '@/services/api';
import { useLocalStorage } from './useLocalStore';

export function useWeather() {
  const [today, setToday] = useState({});
  const [hourly, setHourly] = useState(null);
  const [daily, setDaily] = useState(null);
  const [error, setError] = useState(null);
  const [isMetric, setIsMetric] = useState(true);
  const [lisMetric, lsetIsMetric] = useLocalStorage('metric', true);
  // const [city, _setCity] = useState('');

  const [isLoading, setLoading] = useState(true);
  const [gps, setGps] = useState({ lat: 19.4285, lon: -99.1277 });
  const [cities, setCities] = useState(['mexico city', 'sydney', 'new york', 'london', 'tokio']);
  const [lcities, lsetCities] = useLocalStorage('cities', [
    'mexico city',
    'sydney',
    'new york',
    'london',
    'tokio',
  ]);
  let city = '';

  //LOAD CONFIGURATION
  useEffect(() => {
    setCities(lcities);
    city = lcities[0];
    setCity(lcities[0], true);
    setIsMetric(lisMetric);
  }, []);

  useEffect(() => {
    const today_data = async () => {
      try {
        setLoading(true);

        const prom1 = getDayData(gps.lat, gps.lon, isMetric);
        const prom2 = getDayHourData(gps.lat, gps.lon);
        const prom3 = getDailyData(gps.lat, gps.lon);

        Promise.all([prom1, prom2, prom3])
          .then((values) => {
            setToday(values[0]);
            setHourly(values[1]);
            setDaily(values[2]);
            setLoading(false);
          })
          .catch((error) => {
            throw error;
          });
      } catch (err) {
        setError(err);
        console.log(err);
      }
    };

    today_data();
  }, [gps, isMetric]);

  function changeUnits(val) {
    setIsMetric(val);
    lsetIsMetric(val);
  }

  async function setCity(_city, fisrtTime = false) {
    _city = _city.toLowerCase();

    try {
      if (_city === city && !fisrtTime) return;
      if (_city !== '' || fisrtTime) {
        const data3 = await getLangLong(_city);

        if (data3.length === 0) throw new Error('City doesnt exist');

        if (cities[0] !== _city) {
          if (!fisrtTime) {
            setCities((prev) => [_city, ...prev.filter((x) => x !== _city).slice(0, 4)]);
            lsetCities([_city, ...cities.filter((x) => x !== _city).slice(0, 4)]);
          }
        }
        setGps({ lat: data3[0], lon: data3[1] });
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

import { useState, useEffect } from 'react';
import { getDailyData, getDayData, getDayHourData, getLangLong } from '@/services/api';

export function useWeather() {
  const [today, setToday] = useState({});
  const [hourly, setHourly] = useState(null);
  const [daily, setDaily] = useState(null);
  const [error, setError] = useState(null);
  const [isMetric, setIsMetric] = useState(true);
  const [city, _setCity] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [gps, setGps] = useState({ lat: 19.4285, lon: -99.1277 });

  useEffect(() => {
    const today_data = async () => {
      try {
        setLoading(true);
        console.log({ gps });
        const data = await getDayData(gps.lat, gps.lon, isMetric);
        const data1 = await getDayHourData(gps.lat, gps.lon);
        const data2 = await getDailyData(gps.lat, gps.lon);

        setToday(data);
        setHourly(data1);
        setDaily(data2);
        setLoading(false);
      } catch (err) {
        setError(err);
        console.log(err);
        throw err;
      }
    };

    today_data();
  }, [gps, isMetric]);

  async function setCity(city) {
    _setCity(city);
    if (city !== '') {
      const data3 = await getLangLong(city);
      setGps({ lat: data3[0], lon: data3[1] });
    }
  }

  return { today, hourly, daily, isLoading, error, isMetric, setIsMetric, city, setCity, setGps };
}

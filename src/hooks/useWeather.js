import { useState, useEffect } from 'react';
import { getDailyData, getDayData, getDayHourData, getLangLong } from '@/services/api';

export function useWeather() {
  const [today, setToday] = useState(null);
  const [hourly, setHourly] = useState(null);
  const [daily, setDaily] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const today_data = async () => {
      try {
        const data = await getDayData(20.671, -103.3299);
        const data1 = await getDayHourData(20.671, -103.3299);
        const data2 = await getDailyData(20.671, -103.3299);
        const data3 = await getLangLong('ciudad de mexico,');

        setToday(data);
        setHourly(data1);
        setDaily(data2);

        setLoading(false);
      } catch (err) {
        setError(err);
        throw err;
      }
    };

    today_data();
  }, []);

  return { today, hourly, daily, isLoading, error };
}

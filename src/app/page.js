'use client';

import { Header } from '@/components/header';
import { Inputs } from '@/components/inputs';
import { Today } from '@/components/today';
import { Hourly } from '@/components/hourly';
import { Daily } from '@/components/daily';

import { useState, useEffect } from 'react';
import { getDailyData, getDayData, getDayHourData } from '@/services/api';

export default function Home() {
  const [today, setToday] = useState(null);
  const [hourly, setHourly] = useState(null);
  const [daily, setDaily] = useState(null);

  useEffect(() => {
    const today_data = async () => {
      const data = await getDayData(20.671, -103.3299);

      const data1 = await getDayHourData(20.671, -103.3299);
      const data2 = await getDailyData(20.671, -103.3299);
      setToday(data);
      setHourly(data1);
      setDaily(data2);
    };
    console.log('entro');
    today_data();
  }, []);

  return (
    <div className="flex justify-center items-center  h-screen ">
      <div className="flex justify-center w-3/5 shadow-lg  h-auto py-10  bg-gradient-to-tl  from-blue-950 to-cyan-600 rounded-lg overflow-hidden">
        <div className="w-3/5 flex flex-col">
          <Header />
          <Inputs />
          <Today data={today} />
          <Hourly data={hourly} />
          <Daily data={daily} />
        </div>
      </div>
    </div>
  );
}

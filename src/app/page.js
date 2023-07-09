'use client';

import { Header } from '@/components/header';
import { Inputs } from '@/components/inputs';
import { Today } from '@/components/today';
import { useWeather } from '@/hooks/useWeather';
import Background from '@/components/background';
import { WeatherInfo } from '@/components/weatherinfo';
import { Suspense, useMemo } from 'react';
import { Loader } from '@/components/loader';

export default function Home() {
  const { daily, today, hourly, setGps, isMetric, changeUnits, setCity, isLoading, error, cities } =
    useWeather();


  if(error){
    return (<h1>{error.message}</h1>)
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col w-full">
          <Header setCity={setCity} cities={cities} />
          <Inputs setGps={setGps} isMetric={isMetric} changeUnits={changeUnits} setCity={setCity} />
          <Today data={today} isMetric={isMetric} />
          <WeatherInfo
            prefix="h"
            title="HOURLY CAST"
            data={hourly}
            isMetric={isMetric}
            formatCard="hh:mm A"
          />
          <WeatherInfo
            prefix="d"
            title="DAILY FORECAST"
            data={daily}
            isMetric={isMetric}
            formatCard="dddd"
          />
        </div>
      )}
    </>
  );
}

//TODO[x]  GET LOCATION GPS
//TODO [x] SAVE LAST SEARCH
//TODO [x] SHOW LAST SEARCH ON HEADER
//TODO [ ] CHANGE BACKGROUND DEPENDS ON THE WEATHER
//TODO [ ] CREATE A CONTEXT

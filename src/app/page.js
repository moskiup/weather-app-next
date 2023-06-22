'use client';

import { Header } from '@/components/header';
import { Inputs } from '@/components/inputs';
import { Today } from '@/components/today';
import { Hourly } from '@/components/hourly';
import { Daily } from '@/components/daily';
import { Error } from '@/components/error';
import { useEffect, useState } from 'react';
import { MyProvider, useMyContext } from '@/context/myContext';
import { useWeather } from '@/hooks/useWeather';
import { useLocalStore } from '@/hooks/useLocalStore';
import Background from '@/components/background';

export default function Home() {
  // const isLoading = false;
  const { daily, today, hourly, isLoading, setGps, isMetric, changeUnits, setCity, error, cities } =
    useWeather();

  {
    return isLoading ? (
      <h1>Cargando</h1>
    ) : (
      <div className="100vh bg-slate-300 w-full">
        <Background />
        <div className="flex justify-center items-center  h-screen ">
          {error && <Error />};
          <div className="flex justify-center w-max p-10 shadow-xl z-10 border-white border-[1px] backdrop-blur-lg border-opacity-30 shadow-slate-800  h-auto py-10 bg-sky-600 bg-opacity-60  rounded-lg overflow-hidden">
            <div className="flex flex-col">
              <Header setCity={setCity} cities={cities} />
              <Inputs
                setGps={setGps}
                isMetric={isMetric}
                changeUnits={changeUnits}
                setCity={setCity}
              />
              <Today data={today} />
              <Hourly data={hourly} />
              <Daily data={daily} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//TODO[x]  GET LOCATION GPS
//TODO [x] SAVE LAST SEARCH
//TODO [x] SHOW LAST SEARCH ON HEADER
//TODO [ ] CHANGE BACKGROUND DEPENDS ON THE WEATHER
//TODO [ ] CREATE A CONTEXT

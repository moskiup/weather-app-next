"use client"

import { Today } from '@/components/today';
import { Loader } from '@/components/loader';
import { Inputs } from '@/components/inputs';
import { Header } from '@/components/header';
import { useMyContext } from '@/context/myContext';
import { DailyInfo } from '@/components/dailyinfo';
import { HourlyInfo } from '@/components/hourlyinfo';
import { useWeather } from '@/hooks/useWeather';
import Prueba from '@/components/Prueba';
import { useMemo } from 'react';


const isLoading = false;
export default function Home() {
  // const {setCity} = useWeather();
    // const {isLoading} = useMyContext();

  console.log("cargando home")
    // if(error){
  //   return (<h1>{error.message}</h1>)
  // }

  return (
    <>
      {isLoading  ? (
        <Loader />
      ) : (
        <div className="flex flex-col w-full">
          {/* <Prueba /> */}
          <Header />
          <Inputs />
          {/*<Today />
          <HourlyInfo />
          <DailyInfo /> */}
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

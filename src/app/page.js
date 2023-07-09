"use client"

import { Today } from '@/components/today';
import { useWeather } from '@/hooks/useWeather';
import { WeatherInfo } from '@/components/weatherinfo';
import { Loader } from '@/components/loader';
import { Inputs } from '@/components/inputs';
import { Header } from '@/components/header';
import { useMyContext } from '@/context/myContext';
import { DailyInfo } from '@/components/dailyinfo';
import { HourlyInfo } from '@/components/hourlyinfo';


export default function Home() {
    const {  setGps, changeUnits, setCity,  error } =
    useWeather();
    const {isLoading ,  weatherResponse , cities} = useMyContext();

    // if(error){
  //   return (<h1>{error.message}</h1>)
  // }

  return (
    <>
      {isLoading  ? (
        <Loader />
      ) : (
        <div className="flex flex-col w-full">
          <Header setCity={setCity} />
          <Inputs setGps={setGps}  changeUnits={changeUnits} setCity={setCity} />
          <Today />
          <HourlyInfo />
          <DailyInfo />
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

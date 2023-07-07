'use client';

import { Header } from '@/components/header';
import { Inputs } from '@/components/inputs';
import { Today } from '@/components/today';
import { Error } from '@/components/error';
import { useWeather } from '@/hooks/useWeather';
import Background from '@/components/background';
import { WeatherInfo } from '@/components/weatherinfo';

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
        <div className="flex  sm:text-base justify-center items-center w-full md:h-screen">
          {error && <Error />}
          <div className="flex justify-center p-2 md:p-10 shadow-xl  z-10 border-white border-[1px] backdrop-blur-lg border-opacity-30 shadow-slate-800  h-auto  bg-sky-600 bg-opacity-60  rounded-lg overflow-hidden">
            <div className="flex flex-col min-w-[320px] md:min-w-[620px]">
              <Header setCity={setCity} cities={cities} />
              <Inputs
                setGps={setGps}
                isMetric={isMetric}
                changeUnits={changeUnits}
                setCity={setCity}
              />
              <Today data={today} isMetric={isMetric} />
              <WeatherInfo prefix="h" title="HOURLY CAST" data={hourly} isMetric={isMetric} />
              <WeatherInfo prefix="d" title="DAILY FORECAST" data={daily} isMetric={isMetric} />
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

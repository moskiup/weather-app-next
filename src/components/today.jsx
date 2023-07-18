import {
  UilTemperatureHalf,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
  UilArrowUp,
  UilArrowDown,
} from '@iconscout/react-unicons';

import Image from 'next/image';
import Moment from 'react-moment';
import { getTempFormat } from '@/utils/utils';
import { useMemo } from 'react';
import { useMyContext } from '@/context/myContext';

export function Today() {
  const { isMetric, weatherResponse } = useMyContext();
  const data = weatherResponse.today;

  return (
    data && (
      <div className="flex items-center flex-col">
        {TodayHeader()}
        {TodayMain()}
        {TodayFooter()}
      </div>
    )
  );

  function TodayFooter() {
    return (
      <div className="p-4 flex justify-between text-sm md:text-sm flex-wrap w-full">
        <div className="w-2/4 md:w-1/4 flex justify-center order-1 md:order-1">
          <UilSun />
          <span className="md:mx-2 ">
            Rise: <Moment date={data.sunrise} format={'hh:mm A'} />
          </span>
          <span className="hidden md:block">|</span>
        </div>
        <div className="w-2/4  md:w-1/4 flex justify-center order-3 md:order-2">
          <UilSunset />
          <span className="md:mx-2 ">
            Set: <Moment date={data.sunset} format={'hh:mm A'} />
          </span>
          <span className="hidden md:block">|</span>
        </div>

        <div className="w-2/4  md:w-1/4 flex justify-center order-2 md:order-3">
          <UilArrowUp />
          <span className="md:mx-2 justify-center">
            {' '}
            High: {getTempFormat(data.temp_max, isMetric)}
          </span>
          <span className="hidden md:block">|</span>
        </div>

        <div className=" w-2/4 md:w-1/4 flex justify-center order-4 md:order-4">
          <UilArrowDown />
          <span className="md:ml-2">Low: {getTempFormat(data.temp_min, isMetric)} </span>
        </div>
        <p></p>
      </div>
    );
  }

  function TodayHeader() {
    return (
      <p className="m-4 text-lg flex uppercase">
        <Moment date={data.now} format="DD MMM YYYY" utc />
        {/* <span className="mx-4">|</span> */}
        {/* <span className="hidden md:block"> Local time :</span>
        <Moment date={data.now} format="hh:mm A" utc /> */}
      </p>
    );
  }

  function TodayMain() {
    return (
      <>
        <p className="text-4xl">{data.name}</p>
        <div className="flex  flex-wrap   justify-around items-center w-full">
          <div className="text-center text-2xl order-2 w-1/2 md:w-1/3 md:order-1 flex flex-col justify-center items-center">
            {data.weather?.main.toUpperCase()}
            <Image
              src={data.url_icon}
              height={120}
              width={120}
              alt={data.weather?.main.toLowerCase()}
              className="-mt-6 -mb-6"
            />
          </div>
          <div className="text-7xl order-1 md:order-2 md:w-1/3 w-full text-center">
            {getTempFormat(data.temp, isMetric)}
          </div>
          <div className="order-3 w-1/2 md:w-1/3 flex-row  flex justify-center  md:order-3">
            <div className="">
              <div className="flex m-x-auto">
                <UilTemperatureHalf /> Real felt: {getTempFormat(data.feels_like, isMetric)}
              </div>
              <p className="flex">
                <UilTear />
                Humidity: {data.humidity}%
              </p>
              <p className="flex">
                <UilWind /> Wind: {data.wind_speed?.toFixed(1)} km/h
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

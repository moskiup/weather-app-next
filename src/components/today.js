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

export function Today({ data , isMetric }) {
  const today = data;
  return (
    today && (
      <div className="flex items-center flex-col">
        <p className="m-4 text-lg flex">
          <Moment date={today.now} format="DD MMM YYYY" utc />
          <span className="mx-4">|</span>
          <span className="hidden md:block"> Local time :</span>
          <Moment date={today.now} format="hh:mm A" utc />
        </p>
        <p className="text-3xl">{today.name}</p>
        <div className="flex  flex-wrap   justify-around items-center w-full">
          <div className="text-center order-2 w-1/2 md:w-1/3 md:order-1 flex flex-col items-center">
            {today.weather.main.toUpperCase()}
            <Image
              src={today.url_icon}
              height={100}
              width={100}
              alt={today.weather.main.toLowerCase()}
              className="-mt-6 -mb-6"
            />
          </div>
          <div className="text-7xl order-1 md:order-2 md:w-1/3 w-full text-center">
            {getTempFormat(today.temp , isMetric) }
          </div>
          <div className="order-3 w-1/2 md:w-1/3 flex-row  flex justify-center  md:order-3">
            <div className="">
              <div className="flex m-x-auto">
                <UilTemperatureHalf /> Real felt: {getTempFormat(today.feels_like, isMetric) }
              </div>
              <p className="flex">
                <UilTear />
                Humidity: {today.humidity}%
              </p>
              <p className="flex">
                <UilWind /> Wind: {today.wind_speed.toFixed(1)} km/h
              </p>
            </div>
          </div>
        </div>
        <div className="p-4 flex justify-between text-sm md:text-sm flex-wrap w-full">
          <div className="w-2/4 md:w-1/4 flex justify-center order-1 md:order-1">
            <UilSun />
            <span className="md:mx-2 ">
              Rise: <Moment date={today.sunrise} format={'hh:mm A'} />
            </span>
            <span className="hidden md:block">|</span>
          </div>
          <div className="w-2/4  md:w-1/4 flex justify-center order-3 md:order-2">
            <UilSunset />
            <span className="md:mx-2 ">
              Set: <Moment date={today.sunset} format={'hh:mm A'} />
            </span>
            <span className="hidden md:block">|</span>
          </div>

          <div className="w-2/4  md:w-1/4 flex justify-center order-2 md:order-3">
            <UilArrowUp />
            <span className="md:mx-2 justify-center"> High: {getTempFormat(today.temp_max, isMetric)}</span>
            <span className="hidden md:block">|</span>
          </div>

          <div className=" w-2/4 md:w-1/4 flex justify-center order-4 md:order-4">
            <UilArrowDown />
            <span className="md:ml-2">Low: {getTempFormat(today.temp_min , isMetric)} </span>
          </div>
          <p></p>
        </div>
      </div>
    )
  );
}

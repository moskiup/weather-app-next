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

export function Today({ data }) {
  const today = data;
  return (
    today && (
      <div className="flex items-center flex-col">
        <p className="m-4 text-lg">
          <Moment date={today.sunset} format="DD MMM YYYY" />
          | Local time
          <Moment
            date={today.dt}
            format=" : hh:mm A"
            // add={{ hours: today.timezone + 6 }}
          />
          <Moment date={today.timezone} format="h" />
          {/* Tuesday ,           31 May 2022 | Local time : 11:24 AM */}
        </p>
        <p className="text-3xl">{today.name}</p>
        <p className="text-xl m-4 text-cyan-300 font-semibold">{today.weather.main}</p>
        <div className="flex justify-around items-center w-full">
          <p>
            <Image
              src={today.url_icon}
              height={100}
              width={100}
              alt={today.weather.main.toLowerCase()}
            />
          </p>
          <p className="text-7xl">{today.temp.toFixed(0)}º</p>
          <div>
            <p className="flex">
              <UilTemperatureHalf /> Real felt: {today.feels_like.toFixed(0)}º
            </p>
            <p className="flex">
              <UilTear />
              Humidity: {today.humidity}%
            </p>
            <p className="flex">
              <UilWind /> Wind: {today.wind_speed.toFixed(1)} km/h
            </p>
          </div>
        </div>
        <div className="m-4 flex justify-evenly w-full">
          <p className="flex">
            <UilSun />
            <span>
              {' '}
              Rise: <Moment date={today.sunrise} format={'hh:mm A'} />
            </span>
          </p>
          <span>|</span>
          <p className="flex">
            <span>
              <UilSunset />
            </span>{' '}
            Set: <Moment date={today.sunset} format={'hh:mm A'} />
          </p>
          <span>|</span>

          <p className="flex">
            <span>
              <UilArrowUp />
            </span>{' '}
            High: {today.temp_max.toFixed(0)}º
          </p>
          <span>|</span>

          <p className="flex">
            <span className="mr-2">
              <UilArrowDown />
            </span>{' '}
            Low: {today.temp_min.toFixed(0)}º
          </p>
          <p></p>
        </div>
      </div>
    )
  );
}

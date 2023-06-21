import {
  UilTemperatureHalf,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
  UilArrowUp,
  UilArrowDown,
} from "@iconscout/react-unicons";

export function Today() {
  return (
    <div className="flex items-center flex-col">
      <p className="m-4 text-lg">
        Tuesday , 31 May 2022 | Local time : 11:24 AM
      </p>
      <p className="text-3xl">LONDON GB</p>
      <p className="text-xl m-4 text-cyan-300 font-semibold">Clouds</p>
      <div className="flex justify-between items-center w-full">
        <p>NUBE</p>
        <p className="text-7xl">15~</p>
        <div>
          <p className="flex">
            <UilTemperatureHalf /> Real felt: 14`
          </p>
          <p className="flex">
            <UilTear />
            Humidity: 64%
          </p>
          <p className="flex">
            <UilWind /> WindL 5 km/4
          </p>
        </div>
      </div>
      <div className="m-4 flex justify-evenly w-full">
        <p className="flex">
          <UilSun />
          <span> Rise: 04:50</span>
        </p>
        <span>|</span>
        <p className="flex">
          <span>
            <UilSunset />
          </span>{" "}
          Rise: 04:50
        </p>
        <span>|</span>

        <p className="flex">
          <span>
            <UilArrowUp />
          </span>{" "}
          Rise: 04:50
        </p>
        <span>|</span>

        <p className="flex">
          <span className="mr-2">
            <UilArrowDown />
          </span>{" "}
          Rise: 04:50
        </p>
        <p></p>
      </div>
    </div>
  );
}

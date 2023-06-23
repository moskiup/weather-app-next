import { useRef } from 'react';
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons';

export function Inputs({ setGps, isMetric, changeUnits, setCity }) {
  const refElem = useRef(null);

  function getGPS() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          // console.log('Latitude:', lat);
          // console.log('Longitude:', lon);
          setGps({ lat, lon });
        },
        function (error) {
          console.log('Error getting location:', error.message);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  function handleUnits(val) {
    changeUnits(val);
  }

  function handleSearch() {
    const val = refElem.current.value;
    console.log(val);
    if (val !== '') setCity(val);
    refElem.current.value = '';
  }

  function handleKey(evt) {
    if (evt.key === 'Enter') handleSearch();
  }

  return (
    <div className="flex flex-row w-3/4 self-center mt-3 items-center justify-center space-x-4">
      <input
        type="text"
        className=" text-sm  p-1 w-full min-w-[150px]  md:text-base font-normal text-slate-600  focus:outline-none md:p-2   rounded-md"
        ref={refElem}
        onKeyDown={handleKey}
      />
      <button className="m-0" onClick={handleSearch}>
        <UilSearch size={35} className="text-white" />
      </button>
      <button onClick={getGPS}>
        <UilLocationPoint size={35} className="text-white" />
      </button>
      <div className="flex flex-row w-1/4 items-center justify-center">
        <button
          name="metric"
          className={`${isMetric ? 'text-cyan-300 font-bold' : ' text-white'} md:text-lg `}
          disabled={isMetric}
          onClick={() => handleUnits(true)}
        >
          ºC
        </button>
        <p className="mx-4">|</p>
        <button
          name="imperial"
          className={`${!isMetric ? 'text-cyan-300 font-bold' : ' text-white'} md:text-lg`}
          disabled={!isMetric}
          onClick={() => handleUnits(false)}
        >
          ºF
        </button>
      </div>
    </div>
  );
}

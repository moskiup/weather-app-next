'use client';

import { useRef } from 'react';
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons';
import { getGPS } from '@/utils/utils';
import { useMyContext } from '@/context/myContext';

export function Inputs({ changeUnits, setCity }) {
  const { updateContext, isMetric } = useMyContext();
  const refElem = useRef(null);

  function handleUnits(val) {
    updateContext({isMetric:val})
  }

  function handleSearch() {
    const val = refElem.current.value;
    if (val !== '') setCity(val);
    refElem.current.value = '';
  }

  function handleKey(evt) {
    if (evt.key === 'Enter') handleSearch();
  }

  function setGps(lat, lon) {
    updateContext({ gps: { lat, lon } });
  }

  return (
    <div className="flex flex-row w-3/4 self-center mt-3 items-center justify-center space-x-4">
      <input
        type="text"
        className=" text-sm  p-1 w-full min-w-[150px]  md:text-base font-normal text-slate-600  focus:outline-none md:p-2   rounded-md"
        ref={refElem}
        onKeyDown={handleKey}
        aria-label="City Search"
      />
      <button className="m-0" aria-label="Search" onClick={handleSearch}>
        <UilSearch size={35} className="text-white" />
      </button>
      <button onClick={async () => updateContext(await getGPS())} aria-label="Get location gps">
        <UilLocationPoint size={35} className="text-white" />
      </button>
      <div className="flex flex-row w-1/4 items-center justify-center">
        <button
          name="metric"
          className={`${isMetric ? 'text-cyan-300 font-bold' : ' text-white'} md:text-lg `}
          disabled={isMetric}
          onClick={() => handleUnits(true)}
          aria-label="celsius"
        >
          ºC
        </button>
        <p className="mx-4">|</p>
        <button
          name="imperial"
          className={`${!isMetric ? 'text-cyan-300 font-bold' : ' text-white'} md:text-lg`}
          disabled={!isMetric}
          onClick={() => handleUnits(false)}
          aria-label="farenheit"
        >
          ºF
        </button>
      </div>
    </div>
  );
}

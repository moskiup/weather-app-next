import React from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";

export function Inputs() {
  return (
    <div className="flex flex-row w-3/4 self-center mt-3 items-center justify-center space-x-4">
      <input
        type="text"
        className="text-md font-normal text-slate-600  focus:outline-none p-2 w-full  rounded-md"
      />
      <UilSearch size={35} className="text-white" />
      <UilLocationPoint size={35} className="text-white" />
      <div className="flex flex-row w-1/4 items-center justify-center">
        <button name="metric" className="text-white text-lg">
          ºC
        </button>
        <p className="text-white mx-2 text-lg">|</p>
        <button name="imperial" className="text-white   text-lg">
          ºF
        </button>
      </div>
    </div>
  );
}

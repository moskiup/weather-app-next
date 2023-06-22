import React, { createContext, useContext, useState } from 'react';
import { useWeather } from '@/hooks/useWeather';
import { getDailyData, getDayData, getDayHourData, getLangLong } from '@/services/api';

// Create the context object
const MyContext = createContext();
// Create a provider component
const MyProvider = ({ children }) => {
  const [contextState, setContextState] = useState({
    gps_lat: 1,
    gps_lon: 1,
    gpa: 0,
    today: {},
    isLoading: true,
    daily: {},
    hourly: {},
  });

  // Define the function to update the context
  const updateContext = (newContext) => {
    setContextState((prevState) => ({
      ...prevState,
      ...newContext,
    }));
  };

  async function setGps(lat, lon) {
    try {
      updateContext({ isLoading: true });
      const data = await getDayData(lat, lon);
      const data1 = await getDayHourData(lat, lon);
      const data2 = await getDailyData(lat, lon);
      const data3 = await getLangLong('ciudad de mexico,');
      updateContext({ isLoading: false, hourly: data1, daily: data2, today: data });
    } catch (err) {
      // setError(err);
      console.log(err);
      throw err;
    }
  }

  // Provide the context value and the update function to the children
  return (
    <MyContext.Provider value={{ ...contextState, updateContext, setGps }}>
      {children}
    </MyContext.Provider>
  );
};

// Custom hook to access the context and update function
const useMyContext = () => useContext(MyContext);

export { MyProvider, useMyContext };

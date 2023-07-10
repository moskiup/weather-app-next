'use client';
import { createContext, useContext, useState, useEffect , useCallback } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStore';
import { getAllData, getDayData, getLanLon } from '@/services/api';

import { get as getcache, set as setcache } from '@/hooks/useCache';

// Create the context object
const MyContext = createContext();
let city = '';
let cities_latlon = {};
const timecache = 5 * 3600;
// Create a provider component
const MyProvider = ({ children }) => {
  const [lisMetric, localsetIsMetric] = useLocalStorage('metric', true);
  const [lcities, lsetCities] = useLocalStorage('cities', [
    'mexico city',
    'sydney',
    'new york',
    'london',
    'tokyo',
  ]);


  
  const [context, setContextState] = useState({
    isLoading: false,
    isMetric: false,
    weatherResponse: {},
    gps: { lat: 0, lon: 0 },
    cities: [],
    error: undefined,
    curCity: '',
  });

  useEffect(()=> {
    localsetIsMetric(context.isMetric);
  } , [context.isMetric]);

  useEffect(() => {
    console.log('cargo vacio');
    updateContext({ cities: lcities, isMetric: lisMetric  , curCity: lcities[0]});
    // setCity(lcities[0], false);
  }, []);

  //CHANGING CITY
  useEffect(() => {
    const gps = context.gps;
    const today_data = async () => {
      try {
        updateContext({ isLoading: true });
        const cache_daily = `d${gps.lat},${gps.lon}`;
        const cache_today = `t${gps.lat},${gps.lon}`;
        const cache_hourly = `h${gps.lat},${gps.lon}`;
        if (getcache(cache_daily) === undefined) {
          const prom1 = getDayData(gps.lat, gps.lon);
          const prom4 = getAllData(gps.lat, gps.lon);

          Promise.all([prom1, prom4])
            .then((values) => {
              setcache(cache_today, values[0], timecache);
              setcache(cache_hourly, values[1].hourly, timecache);
              setcache(cache_daily, values[1].daily, timecache);

              const weather = {
                today: values[0],
                hourly: values[1].hourly,
                daily: values[1].daily,
              };
              updateContext({ isLoading: false, weatherResponse: weather });
            })
            .catch((error) => {
              throw error;
            });
        } else {
          // const today = await getDayData(gps.lat, gps.lon);
          const weather_data = {
            today: getcache(cache_today),
            hourly: getcache(cache_hourly),
            daily: getcache(cache_daily),
          };
          updateContext({ isLoading: false, weatherResponse: weather_data });

          // setToday(getcache(cache_today));
          // setHourly(getcache(cache_hourly));
          // setDaily(getcache(cache_daily));
        }
      } catch (err) {
        console.error(err);
        setError(err);
        updateContext({ isLoading: false });

        setLoading(false);
      } finally {
      }
    };
    if (gps.lat !== 0 && gps.lon !== 0) today_data();
  }, [context.gps]);

  useEffect(() => {
    
    console.log("cambio de ciudad")
    async function setCity(_city, firstTime = false) {
      _city = _city.toLowerCase();
      try {
        if (_city === city && !firstTime) return;
  
        if (_city !== '') {
          if (cities_latlon[_city] === undefined) {
            const resp = await getLanLon(_city);
            cities_latlon[_city] = { lat: resp[0], lon: resp[1], cityname: resp[2] };
          }
          if (context.cities.lenght > 0 && _city !== context.cities[0]) {
            const newCities = cities.filter((x) => x !== _city);
            updateContext({ cities: [_city, ...newCities] });
            lsetCities([_city, ...newCities]);
          }
  
          updateContext({ gps: cities_latlon[_city], debug: true });
  
          city = _city;
        }
      } catch (error) {
        console.error(error);
        updateContext({ error });
      }
    }

    setCity(context.curCity)
  }, [context.curCity]);

  
  
  // Define the function to update the context
  const updateContext = useCallback(  (newContext) => {
    if (newContext.debug) console.log({ newContext, contextState: context });
    setContextState((prevState) => ({
      ...prevState,
      ...newContext,
    }));
  }, []);

  // Provide the context value and the update function to the children
  return (
    <MyContext.Provider value={{  ...context, updateContext }}>
      {children}
    </MyContext.Provider>
  );
};

// Custom hook to access the context and update function
const useMyContext = () => useContext(MyContext);

export { MyProvider, useMyContext };

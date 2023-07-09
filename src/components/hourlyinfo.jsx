import { useMyContext } from '@/context/myContext';
import { WeatherInfo } from './weatherinfo'


export function HourlyInfo() {
  const {  weatherResponse } = useMyContext();
  const data = weatherResponse.hourly;

  return (
    <WeatherInfo
    prefix="h"
    title="HOURLY CAST"
    data={weatherResponse.hourly}
    formatCard="hh:mm A"
  />
  )
}

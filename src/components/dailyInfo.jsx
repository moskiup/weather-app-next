import { useMyContext } from '@/context/myContext';
import { WeatherInfo } from './weatherinfo'


export function DailyInfo() {
  const {  weatherResponse } = useMyContext();
  const data = weatherResponse.daily;
  // console.log({data})
  return (
    <WeatherInfo
    prefix="d"
    title="DAILY FORECAST"
    data={data}
    formatCard="dddd"
    /> 
  )
}

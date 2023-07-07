import Image from 'next/image';
import Moment from 'react-moment';
import { getTempFormat } from '@/utils/utils';
import { Card } from './card';

export function WeatherInfo({prefix, title, data, isMetric }) {
  return (
    <div className="m-2">
      <h2>{title}</h2>
      <div className="w-full h-[2px] bg-cyan-300"></div>
      <div className="flex justify-around mt-3 flex-wrap text-sm md:text-base">
        {data &&
          data.map((x, i) => {
            const key = prefix + i;
            return (
              <Card
                key={key}
                texttop={<Moment date={x.time} format="hh:mm A" />}
                textbottom={getTempFormat(x.temp, isMetric)}
                imgurl={x.url_icon}
              />
            );
          })}
      </div>
    </div>
  );
}
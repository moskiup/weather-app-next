import Image from 'next/image';
import Moment from 'react-moment';

export function Daily({ data }) {
  return (
    <div className="m-2">
      <h2>Daily FORECAST</h2>
      <div className="w-full h-[2px] bg-cyan-300"></div>
      <div className="flex justify-around mt-5">
        {data &&
          data.map((x, i) => {
            return (
              <div key={i} className="flex justify-center flex-col text-center">
                <div>
                  <Moment date={x.time} format="ddd" />
                </div>
                <div className="-my-4">
                  <Image src={x.url_icon} alt="clear-sky" width={100} height={100} />
                </div>
                <div> {x.temp.toFixed(0)}º </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

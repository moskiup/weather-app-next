import Image from "next/image";

export function Hourly() {
  return (
    <div className="m-2">
      <h2>HOURLY FORECAST</h2>
      <div className="w-full h-[2px] bg-cyan-300"></div>
      <div className="flex justify-around mt-5">
        <div className="flex justify-center flex-col text-center">
          <div> 12:00 PM </div>
          <div>
            <Image
              src="/img/clear-sky.svg"
              alt="clear-sky"
              width={100}
              height={100}
            />
          </div>
          <div> IMAGEN </div>
        </div>
        <div>
          <div> 12:00 PM </div>
          <div> IMAGEN </div>
          <div> IMAGEN </div>
        </div>
        <div>
          <div> 12:00 PM </div>
          <div> IMAGEN </div>
          <div> IMAGEN </div>
        </div>
        <div>
          <div> 12:00 PM </div>
          <div> IMAGEN </div>
          <div> IMAGEN </div>
        </div>
        <div>
          <div> 12:00 PM </div>
          <div> IMAGEN </div>
          <div> IMAGEN </div>
        </div>
      </div>
    </div>
  );
}

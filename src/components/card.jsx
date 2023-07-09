import Image from 'next/image';

export function Card({  texttop, imgurl, textbottom }) {
  return (
    <div   className="flex  justify-center   flex-col text-center">
      <div>{texttop}</div>
      <div className="-my-6">
        <Image src={imgurl} alt="clear-sky" width={100} height={100} />
      </div>
      <div> {textbottom} </div>
    </div>
  );
}

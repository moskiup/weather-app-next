import { Header } from "@/components/header";
import { Inputs } from "@/components/inputs";
import { Today } from "@/components/today";
import { Hourly } from "@/components/hourly";

export default function Home() {
  return (
    <div className="flex justify-center items-center  h-screen ">
      <div className="flex justify-center w-3/5 shadow-lg  h-4/5  bg-gradient-to-tl  from-blue-950 to-cyan-600 rounded-lg overflow-hidden">
        <div className="w-3/5 flex flex-col">
          <Header />
          <Inputs />
          <Today />
          <Hourly />
        </div>
      </div>
    </div>
  );
}

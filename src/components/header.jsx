import { useMyContext } from "@/context/myContext";
import { memo} from 'react'

function _Header({ setCity }) {
  const {cities} = useMyContext();

  console.log('cargando header', cities)
  return (
    <div className="hidden md:flex items-center justify-around my-6">
      {cities &&
        cities.map((city, id) => (
          <button key={id} className="text-white text-lg font-medium" onClick={() => setCity(city)}>
            {city.toUpperCase()}
          </button>
        ))}
    </div>
  );
}

export const Header  = memo(_Header)
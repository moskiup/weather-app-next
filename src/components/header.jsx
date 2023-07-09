import { useMyContext } from "@/context/myContext";

export  function Header({ setCity }) {
  const {cities} = useMyContext();

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


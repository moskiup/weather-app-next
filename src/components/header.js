import { useWeather } from '@/hooks/useWeather';
export function Header({ setCity, cities }) {
  return (
    <div className="flex items-center justify-around my-6">
      {cities &&
        cities.map((city) => (
          <button
            key={city.id}
            className="text-white text-lg font-medium"
            onClick={() => setCity(city)}
          >
            {city.toUpperCase()}
          </button>
        ))}
    </div>
  );
}

export function getTempFormat(temp , ismetric ){

  if(!temp)
    return 0;
    
  if(ismetric)
    return `${temp.toFixed(0)}º`;
  
  return `${(temp*(9/5) + 32).toFixed(0)}º`;
}

export const getGPS = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          resolve({ lat, lon });
        },
        function (error) {
          console.log('Error getting location:', error.message);
          reject({ error });
        }
      );
    } else {
      reject({ error: "Geolocation is not supported" });
    }
  });
};
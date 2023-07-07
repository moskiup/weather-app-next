export function getTempFormat(temp , ismetric ){
  if(ismetric)
    return `${temp.toFixed(0)}º`;
  
  return `${(temp*(9/5) + 32).toFixed(0)}º`;
}

export function getGPS(setGps) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setGps({ lat, lon });
      },
      function (error) {
        console.log('Error getting location:', error.message);
      }
    );
  } else {
    console.log('Geolocation is not supported by this browser.');
  }
}
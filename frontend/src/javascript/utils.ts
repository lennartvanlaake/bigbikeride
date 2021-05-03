export const getPosition = async(): Promise<Position> => {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

type Position = {
  coords: Coords
}

type Coords = {
  latitude: number,
  longitude: number
}


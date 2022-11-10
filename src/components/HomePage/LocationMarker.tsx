import { useMap, Marker, Popup, useMapEvents } from "react-leaflet";
import { useState } from "react";

const LocationMarker = () => {
  interface Position {
    lat: number;
    lng: number;
  }

  const [positions, setPositions] = useState<Position[]>([]);

  // const map = useMapEvents({
  //   click() {},
  // });
  const map = useMap();

  map.on("click", function (e: any) {
    setPositions([...positions, { lat: e.latlng.lat, lng: e.latlng.lng }]);

    console.log(positions);
  });
  // console.log(position);

  return (
    <>
      {positions.map((position) => (
        <>
          <Marker position={[position.lat, position.lng]}>
            <Popup>You are here</Popup>
          </Marker>
        </>
      ))}
    </>
  );
};

export default LocationMarker;

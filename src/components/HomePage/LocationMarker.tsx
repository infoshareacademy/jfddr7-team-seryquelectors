import { useMap, Marker, Popup, useMapEvents } from "react-leaflet";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/global";

const LocationMarker = () => {
  interface Position {
    lat: number;
    lng: number;
  }

  const { position, setPosition } = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);

  // const map = useMapEvents({
  //   click() {},
  // });
  const map = useMap();

  map.on("click", function (e: any) {
    setShowForm(true);
    //setPositions([...positions, { lat: e.latlng.lat, lng: e.latlng.lng }]);
    setPosition([e.latlng.lat, e.latlng.lng]);
    console.log(position);
  });
  // console.log(position);

  return (
    <>
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    </>
  );
};

export default LocationMarker;

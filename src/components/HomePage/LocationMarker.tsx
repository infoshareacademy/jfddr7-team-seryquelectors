import { useMap, Marker, Popup, useMapEvents } from "react-leaflet";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/global";
import { DocumentData } from "firebase/firestore";

const LocationMarker = () => {
  interface Position {
    lat: number;
    lng: number;
  }

  const { position, setPosition, allEvents } = useContext(AuthContext);
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
      {allEvents.map((e: DocumentData, i) => {
        return (
          <Marker key={i} position={e.position}>
            <Popup>
              <>
                {e.name} <br /> {e.email} <br /> {e.description}
              </>
            </Popup>
          </Marker>
        );
      })}
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    </>
  );
};

export default LocationMarker;

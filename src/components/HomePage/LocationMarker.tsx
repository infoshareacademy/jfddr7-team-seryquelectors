import { useMap, Marker, Popup, useMapEvents, Tooltip } from "react-leaflet";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/global";
import { DocumentData } from "firebase/firestore";

const LocationMarker = () => {
  interface Position {
    lat: number;
    lng: number;
  }

  const { position, setPosition, allEvents, setShowForm, showForm } =
    useContext(AuthContext);

  // const map = useMapEvents({
  //   click() {},
  // });
  const map = useMap();

  map.on("click", function (e: any) {
    setShowForm(true);
    //setPositions([...positions, { lat: e.latlng.lat, lng: e.latlng.lng }]);
    setPosition([e.latlng.lat, e.latlng.lng]);
  });
  // console.log(position);

  return (
    <>
      {allEvents.map((e: DocumentData, i) => {
        return (
          <Marker key={i} position={e.position}>
            <Tooltip>
              <>
                {e.name} <br /> {e.email} <br /> {e.description}
              </>
            </Tooltip>
          </Marker>
        );
      })}
      <Marker position={position}></Marker>
    </>
  );
};

export default LocationMarker;

import {
  useMap,
  Marker,
  useMapEvents,
  Tooltip,
  useMapEvent,
} from "react-leaflet";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../providers/global";
import { DocumentData } from "firebase/firestore";
import { greenIcon, goldIcon, violetIcon } from "../../images/Icon";
import { Map } from "leaflet";

const LocationMarker = () => {
  const { position, setPosition, allEvents, setShowForm, showForm } =
    useContext(AuthContext);
  const [toggleMarker, setToggleMarker] = useState(false);
  // const map = useMapEvents({
  //   click() {},
  // });
  //   const map = useMap();

  const map = useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      setToggleMarker(true);
      setShowForm(true);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  //   map.on("click", function (e: any) {
  //     setShowForm(true);
  //     setToggleMarker(true);

  //     //setPositions([...positions, { lat: e.latlng.lat, lng: e.latlng.lng }]);
  //     setPosition([e.latlng.lat, e.latlng.lng]);
  //   });
  // console.log(position);

  map.on("click", function (e: any) {
    setShowForm(true);
    //setPositions([...positions, { lat: e.latlng.lat, lng: e.latlng.lng }]);
    setPosition([e.latlng.lat, e.latlng.lng]);
  });
  // console.log(position);

  return (
    <>
      {allEvents.map((e: DocumentData, i) => {
        let eventIcon = greenIcon;
        if (e.category === "nauka") {
          eventIcon = violetIcon;
        } else if (e.category === "kultura") {
          eventIcon = goldIcon;
        }
        return (
          <Marker key={i} position={e.position} icon={eventIcon}>
            <Tooltip>
              <>
                {e.name} <br /> {e.description} <br /> {e.category}
              </>
            </Tooltip>
          </Marker>
        );
      })}
      {toggleMarker ? <Marker position={position}></Marker> : null}
    </>
  );
};

export default LocationMarker;

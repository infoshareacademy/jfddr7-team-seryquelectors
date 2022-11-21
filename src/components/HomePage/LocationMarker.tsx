import { Marker, useMapEvents, Tooltip } from "react-leaflet";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/global";
import { DocumentData } from "firebase/firestore";
import { greenIcon, goldIcon, violetIcon } from "../../images/Icon";

const LocationMarker = () => {
  const { position, setPosition, allEvents, setShowForm, user } =
    useContext(AuthContext);
  const [toggleMarker, setToggleMarker] = useState(false);

  const map = useMapEvents({
    click(e) {
      console.log(e);
      setPosition([e.latlng.lat, e.latlng.lng]);
      setToggleMarker(true);
      setShowForm(true);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return (
    <>
      {allEvents.map((e: DocumentData, i) => {
        let eventIcon = greenIcon;
        if (e.category.indexOf("nauka") > -1) {
          eventIcon = violetIcon;
        } else if (e.category.indexOf("kultura") > -1) {
          eventIcon = goldIcon;
        }
        return (
          <Marker key={i} position={e.position} icon={eventIcon}>
            <Tooltip>
              <>
                <b>
                  {e.name} {e.email === user ? <span>(Ty)</span> : null} -{" "}
                  {e.category}
                </b>
                <br />
                {e.description}
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

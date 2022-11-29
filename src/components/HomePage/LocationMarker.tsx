import { Marker, useMapEvents, Tooltip } from "react-leaflet";
import { useContext, useState } from "react";

import { DocumentData } from "firebase/firestore";
import { greenIcon, goldIcon, violetIcon } from "../../images/Icon";
import { GlobalDataContext } from "../../providers/global";

const LocationMarker = () => {
  const { position, setPosition, allEvents, setShowForm, user, filter, setShowDetails } = useContext(GlobalDataContext);
  const [toggleMarker, setToggleMarker] = useState(false);
  const map = useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      setToggleMarker(true);
      setShowForm(true);
      map.flyTo(e.latlng, map.getZoom());
    },
  });
  const sortedEvents =
    filter == "none"
      ? allEvents
      : allEvents
          .filter((e: DocumentData) => e.category.indexOf(filter) > -1)
          .sort((a: DocumentData, b: DocumentData) => {
            return b.likes.length - a.likes.length;
          });
  return (
    <>
      {sortedEvents.map((e: DocumentData, i) => {
        let eventIcon = greenIcon;
        if (e.category.indexOf("nauka") > -1) {
          eventIcon = violetIcon;
        } else if (e.category.indexOf("kultura") > -1) {
          eventIcon = goldIcon;
        }
        return (
          <Marker key={i} position={e.position} icon={eventIcon} eventHandlers={{ click: () => setShowDetails(e.id) }}>
            <Tooltip>
              <>
                <b>
                  {e.name} {e.email === user ? <span>(Ty)</span> : null} - {e.category}
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

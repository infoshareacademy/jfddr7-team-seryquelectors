import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents } from "react-leaflet";
import styles from "./Home.module.css";
import { useState } from "react";
// import { useMapEvents } from "react-leaflet/lib/hooks";
import { LatLng } from "leaflet";
import LocationMarker from "./LocationMarker";

export const Home: React.FC = () => {
  return (
    <div>
      <MapContainer center={[54.352024, 18.646639]} zoom={13} scrollWheelZoom={true} className={styles.wrapper}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
        <Marker position={[54.352024, 18.646639]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>

        {/* {(map) => {
						console.log("map center:", map.getCenter());
						map.on("click", function (e) {
							const { lat, lng } = e.latlng;
							L.marker([lat, lng], { icon }).addTo(map);
						});
						return null;
					}} */}
      </MapContainer>
    </div>
  );
};

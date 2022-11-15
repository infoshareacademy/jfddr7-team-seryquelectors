import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import styles from "./Home.module.css";

// import { useMapEvents } from "react-leaflet/lib/hooks";

import LocationMarker from "./LocationMarker";
import { Sidebar } from "../Sidebar/Sidebar";
import { Navbar } from "../Navbar/Navbar";

export const Home: React.FC = () => {
  return (
    <div className="navMapSideWrapper">
      <Navbar />

      <div className={styles.wrapper}>
        <Sidebar />
        <MapContainer
          center={[54.352024, 18.646639]}
          zoom={13}
          scrollWheelZoom={true}
          zoomControl={false}
          className={styles.mapWrapper}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ZoomControl position="topright" />
          <LocationMarker />
        </MapContainer>
      </div>
    </div>
  );
};

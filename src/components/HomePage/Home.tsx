import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import styles from "./Home.module.scss";
import LocationMarker from "./LocationMarker";
import { Navbar } from "../Navbar/Navbar";
import { useContext } from "react";
import { GlobalDataContext } from "../../providers/global";
import { ReactElement } from "react";

export const Home = () : ReactElement => {
  const { position } = useContext(GlobalDataContext);

  return (
    <>
      <Navbar />
      <MapContainer center={position} zoom={14} scrollWheelZoom={true} zoomControl={false} className={styles.map}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ZoomControl position="topright" />
        <LocationMarker />
      </MapContainer>
    </>
  );
};

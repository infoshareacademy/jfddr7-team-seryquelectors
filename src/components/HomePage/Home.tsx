import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import styles from "./Home.module.css";

export const Home: React.FC = () => {
	return (
		<div>
			<MapContainer
				center={[54.352024, 18.646639]}
				zoom={13}
				scrollWheelZoom={true}
				className={styles.wrapper}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={[51.505, -0.09]}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
			</MapContainer>
		</div>
	);
};

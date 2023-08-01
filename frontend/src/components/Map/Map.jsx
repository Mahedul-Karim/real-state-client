import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import GeoCoderMarker from "./GeoCode";

function Map({ address }) {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
      style={{
        height: "40vh",
        width: "100%",
        marginTop: "20px",
        zIndex: 0,
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoCoderMarker address={address} />
    </MapContainer>
  );
}
export default Map;

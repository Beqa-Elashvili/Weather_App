import { MapContainer } from "react-leaflet";
import { useEffect } from "react";
import useGlobalProvider from "@src/Providers/useGlobalProvider";
import { useMap, Marker, Popup, useMapEvent, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export function MapContent() {
  const { TbilisiWeather } = useGlobalProvider();

  function ChangeMapView({ position }) {
    const map = useMap();
    useEffect(() => {
      if (position) {
        map.setView(position, map.getZoom());
      }
    }, [position]);
    return null;
  }

  const position = TbilisiWeather
    ? [TbilisiWeather.location.lat, TbilisiWeather.location.lon]
    : null;

  return (
    <div>
      {position && (
        <MapContainer
          center={position}
          zoom={10}
          scrollWheelZoom={false}
          style={{ height: "200px", width: "100%", borderRadius: "12px" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=d3k12FZaz83jdLUdUwqb"
          />
          <ChangeMapView position={position} />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
}

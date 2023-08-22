import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

export default function Map({ position }) {
  return (
    <MapContainer
      center={position}
      zoom={13}
      // scrollWheelZoom={false}
      // style={{ height: '100%', width: '100%' }}
      className="h-[400px] w-full lg:w-[580px] items-center rounded-xl"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

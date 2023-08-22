import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

export default function Map({ listing }) {
  const { geolocation, address } = listing;
  // Construct the Google Maps directions URL
  const directionsUrl = `https://www.google.com/maps/dir//${geolocation.lat},${geolocation.lng}`;
  return (
    <MapContainer
      center={[geolocation.lat, geolocation.lng]}
      zoom={13}
      // scrollWheelZoom={false}
      // style={{ height: '100%', width: '100%' }}
      className="h-[400px] w-full items-center rounded-xl"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[geolocation.lat, geolocation.lng]}>
        <Popup>
          <div>
            <h3 className="mb-2">{address}</h3>
            <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
              Get Directions
            </a>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

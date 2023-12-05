import { useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { Icon } from "leaflet";
import 'leaflet/dist/leaflet.css'

const Map = ({ position }) => {
    const mapRef = useRef();
    //@ VALUE
    let [centerPosition, setCenterPosition] = useState(position),
        [zoomSize, setZoomSize] = useState(32)

    const codingSpot = new Icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    return (
        <MapContainer
            ref={mapRef}
            center={centerPosition}// 設定地圖中心點
            zoom={zoomSize} //放大級別
            scrollWheelZoom={true}
            style={{ height: 200, width: "100%" }}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
                position={position}
                icon={codingSpot}>
            </Marker>
        </MapContainer>
    )
}

export default Map
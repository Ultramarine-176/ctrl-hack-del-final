import React from 'react'
import './ClinicPage.css';

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import { Icon, divIcon, point } from "leaflet";

const customIcon = new Icon({
  iconUrl: require("./placeholder.png"),
  iconSize: [45, 45] 
});

const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true)
  });
};

const markers = [
  {
    geocode: [43.66555385942618, -79.40340017644553],
    popUp: <div dangerouslySetInnerHTML={{ __html: "Downtown Doctors<br>Address: 720 Spadina Ave<br>Phone Number: (416)-929-1530" }} />
  },
  {
    geocode: [43.671366716970546, -79.39471250309754],
    popUp: <div dangerouslySetInnerHTML={{ __html: "The Toronto Clinic<br>Address: 55 Avenue Rd<br>Phone Number: (416)-849-5555" }} />
  },
  {
    geocode: [43.66524925978806, -79.38785046076755],
    popUp: <div dangerouslySetInnerHTML={{ __html: "Sanomed Medical Clinic<br>Address: 1000 Bay St. Unit 2<br>Phone Number: (416)-923-7770" }} />
  },
  {
    geocode: [43.657332113579514, -79.40324754542834],
    popUp: <div dangerouslySetInnerHTML={{ __html: "Family Practice Walk-In Clinic<br>Address: 343 College St<br>Phone Number: (416)-519-9086" }} />
  },
  {
    geocode: [43.6703475555966, -79.39377812212548],
    popUp: <div dangerouslySetInnerHTML={{ __html: "Care & Family Health Yorkville<br>Address: 162 Cumberland St #200<br>Phone Number: (647)-951-4770" }} />
  },
  {
    geocode: [43.64308984410765, -79.42803271843822],
    popUp: <div dangerouslySetInnerHTML={{ __html: "City Wellness<br>Address: 1230 Queen St W <br>Phone Number: (647)-207-3108" }} />
  },
  {
    geocode: [43.673227453816395, -79.40804089144622],
    popUp: <div dangerouslySetInnerHTML={{ __html: "Walmer Road Health Clinic<br>Address: 140 Walmer Rd <br>Phone Number: (416)-819-1906" }} />
  },
  {
    geocode: [43.67228376036055, -79.42196956076731],
    popUp: <div dangerouslySetInnerHTML={{ __html: "The Clinic at Christie<br>Address: 672 Dupont St Unit 106 <br>Phone Number: (416)-536-8000" }} />
  },
  {
    geocode: [43.65761798864876, -79.40119311659348],
    popUp: <div dangerouslySetInnerHTML={{ __html: "Royal Care Walk-in Clinic<br>Address: 295 College St <br>Phone Number: (416)-925-5511" }} />
  },
  {
    geocode: [43.66670282822017, -79.41201156110576],
    popUp: <div dangerouslySetInnerHTML={{ __html: "Bloor Medical Clinic<br>Address: 844 Bathurst St <br>Phone Number: (416)-534-4214" }} />
  },
  {
    geocode: [43.66485397181035, -79.41430077610708],
    popUp: <div dangerouslySetInnerHTML={{ __html: "The Circumcision Clinic - BloorKids - <br>Address: 622 Bloor St W <br>Phone Number: (437)-677-2747" }} />
  },
  {
    geocode: [43.649618470390934, -79.38459317241937],
    popUp: <div dangerouslySetInnerHTML={{ __html: "MedCan <br>Address: 150 York St #1500 <br>Phone Number: (416)-350-5900" }} />

  },
  {
    geocode: [43.65971623648038, -79.38794923008868],
    popUp: <div dangerouslySetInnerHTML={{ __html: "Toronto General Hospital<br>Address: 200 Elizabeth St <br>Phone Number: (416)-340-4800" }} />
  },
  {
    geocode: [43.65789854967173, -79.38996513411753],
    popUp: <div dangerouslySetInnerHTML={{ __html: "Mount Sinai Hospital<br>Address: 600 University Ave <br>Phone Number: (416)-596-4200" }} />
  },
  {
    geocode: [43.653276798750134, -79.40578054542851],
    popUp: <div dangerouslySetInnerHTML={{ __html: "Toronto Western Hospital<br>Address: 399 Bathurst St <br>Phone Number: (416)-603-2581" }} />
  },
  {
    geocode: [43.65309176346321, -79.3776426494585],
    popUp: <div dangerouslySetInnerHTML={{ __html: "St. Michael's Hospital<br>Address:  36 Queen St E <br>Phone Number: (416)-360-4000" }} />
  },
  {
    geocode: [43.658600306090804, -79.3871797742632],
    popUp: <div dangerouslySetInnerHTML={{ __html: "University Health Network<br>Address:  190 Elizabeth St <br>Phone Number: (416)-340-3111" }} />
  },
]; 

export default function Clinic() {
  return (
    <MapContainer center={[43.6631, -79.378025]} zoom={15}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
        maxZoom={20}
      />

      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
      >
        {markers.map((marker) => (
          <Marker position={marker.geocode} icon={customIcon}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}

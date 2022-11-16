import L from 'leaflet';

const iconPerson = L.Icon.extend({
  options: {
    iconUrl: require('../img/marker-pin-person.svg'),
    iconRetinaUrl: require('../img/marker-pin-person.svg'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(60, 75),
    className: 'leaflet-div-icon'
  }
});

export { iconPerson };
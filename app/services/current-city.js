import Ember from 'ember';

const SOUTHWICK_LATITUDE = 42.1;
const SOUTHWICK_LONGITUDE = -71.6;
const DEFAULT_ZOOM = 17;

export default Ember.Service.extend({
  mapInstance: null,
  latitude: SOUTHWICK_LATITUDE,
  longitude: SOUTHWICK_LONGITUDE,
  zoom: DEFAULT_ZOOM,
  setCity(city) {
    this.set('city', city);
    let latitude = city.get('latitude');
    let longitude = city.get('longitude');
    this.setProperties({
      latitude,
      longitude
    });
  },

  isPlottingPoint: false,
  newPointLatitude: SOUTHWICK_LATITUDE,
  newPointLongitude: SOUTHWICK_LONGITUDE
});

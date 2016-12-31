import Ember from 'ember';

const SOUTHWICK_LATITUDE = 42.1;
const SOUTHWICK_LONGITUDE = -71.6;
const DEFAULT_ZOOM = 2;

export default Ember.Controller.extend({
  latitude: SOUTHWICK_LATITUDE,
  longitude: SOUTHWICK_LONGITUDE,
  zoom: DEFAULT_ZOOM,
  actions: {
    updateCenter(city) {
      let latitude = city.get('latitude');
      let longitude = city.get('longitude');

      this.setProperties({
        latitude,
        longitude
      })
    },
    updateZoom(zoom) {
      this.set('zoom', zoom);
    },
    selectCity(city) {
      this.transitionToRoute('cities.city', city);
    }
  }
});

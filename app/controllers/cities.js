import Ember from 'ember';

export default Ember.Controller.extend({
  latitude: 42.1,
  longitude: -71.6,
  zoom: 2,
  actions: {
    updateCenter(city) {
      this.setProperties({
        latitude: city.get('latitude'),
        longitude: city.get('longitude')
      })
    },
    updateZoom(zoom) {
      this.set('zoom', zoom);
    },
    transitionToRoute(city) {
      this.transitionToRoute('cities.city.details', city);
    }
  }
});

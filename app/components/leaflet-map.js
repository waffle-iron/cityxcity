import Ember from 'ember';
import LeafletMap from 'ember-leaflet/components/leaflet-map';

export default LeafletMap.extend({
  currentCity: Ember.inject.service(),
  lat: Ember.computed.alias('currentCity.latitude'),
  lng: Ember.computed.alias('currentCity.longitude'),
  zoom: Ember.computed.alias('currentCity.zoom')
});

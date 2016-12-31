import Ember from 'ember';

export default Ember.Controller.extend({
  citiesController: Ember.inject.controller('cities'),
  latitude: Ember.computed.alias('citiesController.latitude'),
  longitude: Ember.computed.alias('citiesController.longitude')
});

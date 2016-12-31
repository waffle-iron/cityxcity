import Ember from 'ember';

export default Ember.Controller.extend({
  citiesController: Ember.inject.controller('cities'),
  currentFeatures: Ember.computed.alias('citiesController.currentFeatures'),
  currentInvestments: Ember.computed.alias('citiesController.currentFeatures'),
  currentParcels: Ember.computed.alias('citiesController.currentParcels')
});

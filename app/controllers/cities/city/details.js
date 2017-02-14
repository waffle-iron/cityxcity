import Ember from 'ember';

export default Ember.Controller.extend({
  currentCity: Ember.inject.service(),
  citiesController: Ember.inject.controller('cities')
});

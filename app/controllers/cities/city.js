import Ember from 'ember';

export default Ember.Controller.extend({
  currentCity: Ember.inject.service(),
  session: Ember.inject.service('session'),
  citiesController: Ember.inject.controller('cities')
});

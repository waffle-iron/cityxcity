import Ember from 'ember';

export default Ember.Controller.extend({
  cc: Ember.inject.controller('cities'),
  currentCity: Ember.inject.service()
});

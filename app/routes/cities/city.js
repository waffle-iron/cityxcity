import Ember from 'ember';

export default Ember.Route.extend({
  currentCity: Ember.inject.service(),
  model(params) {
    return this.store.findRecord('city', params.id);
  },
  afterModel(city) {
    let currentCity = this.get('currentCity');
    currentCity.setCity(city);
  }
});

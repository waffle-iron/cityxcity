import Ember from 'ember';

export default Ember.Controller.extend({
  currentCity: Ember.inject.service(),
  actions: {
    selectCity(city) {
      this.transitionToRoute('cities.city.details', city);
    }
  }
});

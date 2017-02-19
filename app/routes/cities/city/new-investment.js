import Ember from 'ember';

export default Ember.Route.extend({
  currentCity: Ember.inject.service(),
  model(params) {
    let city = this.modelFor('cities.city');
    let currentCity = this.get('currentCity');
    return this.store.createRecord('investment', {
      // oof
      latitude: currentCity.get('newPointLatitude'),
      longitude: currentCity.get('newPointLongitude'),
      city: city.city
    });
  },
  actions: {
    didTransition() {
      console.log('didTransition');
      let currentCity = this.get('currentCity');
      currentCity.set('isPlottingPoint', true);
    },
    willTransition(transition) {
      console.log('willTransition');
      let currentCity = this.get('currentCity');
      currentCity.set('isPlottingPoint', false);
    }
  }
});

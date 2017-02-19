import Ember from 'ember';

export default Ember.Route.extend({
  currentCity: Ember.inject.service(),
  model(params) {
    let city = this.modelFor('cities.city');
    return this.store.createRecord('feature', {
      city: city.city
    });
  },

  setupController(controller, model){ 
    this._super(controller, model);
    controller.set('currentCity', Ember.inject.service('currentCity'));
  },

  actions: {
    didTransition() {
      let currentCity = this.get('currentCity');
      currentCity.set('isPlottingPoint', true);
    },
    willTransition(transition) {
      let currentCity = this.get('currentCity');
      currentCity.set('isPlottingPoint', false)
    }
  }
});

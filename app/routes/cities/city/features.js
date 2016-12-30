import Ember from 'ember';

export default Ember.Route.extend({
  afterModel() {
    let city = this.modelFor('cities.city');
    let controller = this.controllerFor('cities');
    controller.set('currentFeatures', city.get('features'));
    controller.set('currentInvestments', city.get('investments'));
  },
  actions: {
    willTransition() {
      let controller = this.controllerFor('cities');
      controller.set('currentFeatures', null);
      controller.set('currentInvestments', null);
    } 
  }
});

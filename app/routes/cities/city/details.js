import Ember from 'ember';

export default Ember.Route.extend({
  setupController(controller) {
    this._super(...arguments);

    let citiesController = this.controllerFor('cities');
    let visibleFeatures = citiesController.get('visibleFeatures');
    
    controller.set('visibleFeatures', visibleFeatures);
  }
});

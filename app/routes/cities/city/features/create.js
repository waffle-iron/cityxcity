import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    let city = this.modelFor('cities.city');
    return this.store.createRecord('feature', { city });
  },
  afterModel() {
    let city = this.modelFor('cities.city');
    let controller = this.controllerFor('cities');

    controller.set('currentParcels', city.get('parcels'));
    controller.set('currentFeatures', city.get('features'));
  },
  actions: {
    create(model, latitude, longitude) {
      model.setProperties({ latitude, longitude });
      model.save();
    }
  }
});

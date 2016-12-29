import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('city', params.id);
  },
  afterModel(model) {
    let controller = this.controllerFor('cities');
    // let model = this.get('model');
    controller.send('updateCenter', model);
  }
});

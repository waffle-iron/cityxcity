import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    let city = this.modelFor('cities.city');
    return this.store.createRecord('feature', {
      // oof
      city: city.city
    });
  }
});

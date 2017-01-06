import Ember from 'ember';

export default Ember.Route.extend({
  currentCity: Ember.inject.service(),
  model(params) {
    return this.store.findRecord('city', params.id).then((city) => {
      city.get('investments').then((investments) => {
        investments.filter({
          type: 'Public'
        });
        return city;
      });
    });
  },
  afterModel(city) {
    let currentCity = this.get('currentCity');
    currentCity.setCity(city);
  }
});

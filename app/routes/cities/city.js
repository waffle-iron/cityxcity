import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  currentCity: Ember.inject.service(),
  model(params) {
    let cities = this.modelFor('cities');
    let city = cities.findBy('id', params.city_id);

    return RSVP.hash({
      city,
      features: city.get('features'),
      investments: city.get('investments'),
      parcels: city.get('parcels')
    });
  },
  
  afterModel(model) {
    let currentCity = this.get('currentCity');
    currentCity.setCity(model.city);
  }
});

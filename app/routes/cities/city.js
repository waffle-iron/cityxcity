import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  currentCity: Ember.inject.service(),
  model(params) {
    let cities = this.modelFor('cities');
    let city = cities.findBy('id', params.id);

    return RSVP.hash({
      city,
      features: city.get('features')
    });
    // return this.store.findRecord('city', params.id, { include: 'investments,parcels,features' });

      // let investments = this.store.queryAll('investment', { filters: {params.name: name} });
      // let features = this.store.queryAll('feature');
      // let parcels = this.store.queryAll('parcel');
      // return RSVP.hash({investments, features, parcels});
  },
  afterModel(model) {
    let currentCity = this.get('currentCity');
    currentCity.setCity(model.city);
  }
});

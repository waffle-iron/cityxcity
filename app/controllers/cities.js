import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['investments','features','parcels'],
  currentCity: Ember.inject.service(),

  assetTypes: '',
  assets: Ember.computed('', function() {
    return Ember.A(['Private', 'Public', 'Equity']);
  }),

  investments: false,
  features: false,
  parcels: false,

  privat: false,
  publ: false,
  equity: false,


  actions: {
    selectCity(city) {
      this.transitionToRoute('cities.city.details', city);
    }
  }
});

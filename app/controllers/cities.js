import Ember from 'ember';

const FEATURE_PARAMS = ['assetType'];

export default Ember.Controller.extend({
  queryParams: ['investments','features','parcels'].concat(FEATURE_PARAMS),
  currentCity: Ember.inject.service(),

  assetTypes: '',
  assets: Ember.computed('', function() {
    return Ember.A(['Private', 'Public', 'Equity']);
  }),

  investments: false,
  features: false,
  parcels: false,

  //investment filters
  privat: false,
  publ: false,
  equity: false,


  actions: {
    selectCity(city) {
      let id = city.get('id');
      this.transitionToRoute('cities.city.details', id);
    }
  }
});

import Ember from 'ember';
import { INVESTMENT_TYPES } from '../models/investment';

export default Ember.Component.extend({
  currentCity: Ember.inject.service('currentCity'),
  investmentTypes: INVESTMENT_TYPES,
  actions: {
    submit(object) {
      let currentCity = this.get('currentCity');
      object.setProperties({
        latitude: currentCity.get('newPointLatitude'),
        longitude: currentCity.get('newPointLongitude')
      });
      
      return object.save();
    }
  }
});

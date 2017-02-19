import Ember from 'ember';
import { FEATURE_TYPES } from '../models/feature';

export default Ember.Component.extend({
  currentCity: Ember.inject.service('currentCity'),
  assetTypes: FEATURE_TYPES,
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

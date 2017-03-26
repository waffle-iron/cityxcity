import Ember from 'ember';
import { FEATURE_TYPES } from '../models/feature';
import { FEATURE_SUBTYPES } from '../models/feature';
import { INVESTMENT_TYPES } from '../models/investment';

export default Ember.Component.extend({
  submitRoute: 'submit',
  investmentTypes: INVESTMENT_TYPES,
  assetTypes: FEATURE_TYPES,
  assetSubTypes: Ember.computed(function(){
    return Ember.Object.create(FEATURE_SUBTYPES);
  }),
  currentCity: Ember.inject.service('currentCity'),
  modelName: Ember.computed('model', function() {
    let inflector = new Ember.Inflector(Ember.Inflector.defaultRules);
    return inflector.pluralize(this.get('model').constructor.modelName);
  }),
  actions: {
    submit(object) {
      let currentCity = this.get('currentCity');
      
      object.setProperties({
        latitude: currentCity.get('newPointLatitude'),
        longitude: currentCity.get('newPointLongitude')
      });
      
      return object.save().then((model)=> {
        this.get('router').transitionTo(`cities.city.${this.get('modelName')}`, model);
      });
    }
  }
});

import Ember from 'ember';
import isAnyFilter from '../utils/is-any-filter';

export default Ember.Component.extend({
  currentCity: Ember.inject.service(),
  store: Ember.inject.service(),

  modelName: null,
  selected: null,
  
  options: Ember.computed('modelName', function() {
    let inflector = new Ember.Inflector(Ember.Inflector.defaultRules);
    let modelName = this.get('modelName');
    let inflectedModelName = inflector.pluralize(modelName);
    return this.get(`currentCity.city.${inflectedModelName}`)
  })
});

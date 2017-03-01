import Ember from 'ember';
import isAnyFilter from '../utils/is-any-filter';

export default Ember.Component.extend({
  currentCity: Ember.inject.service(),
  store: Ember.inject.service(),

  modelName: null,
  chosenChildren: null,
  
  children: Ember.computed('modelName', function() {
    let inflector = new Ember.Inflector(Ember.Inflector.defaultRules);
    let modelName = this.get('modelName');
    let inflectedModelName = inflector.pluralize(modelName);
    return this.get(`currentCity.city.${inflectedModelName}`)
  }),
  actions: {
    addChild(value) {
      let { children, modelName, store } = this.getProperties('children', 'modelName', 'store');
      let current = Ember.A();
      value.map((value) => { current.pushObject( store.peekRecord(modelName,value) )});
      this.set('chosenChildren', current)
    }
  }
});

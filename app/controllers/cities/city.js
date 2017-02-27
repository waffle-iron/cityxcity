import Ember from 'ember';

export default Ember.Controller.extend({
  currentCity: Ember.inject.service(),
  session: Ember.inject.service('session'),
  citiesController: Ember.inject.controller('cities'),
  searchables: Ember.computed('model.city.name', function() {
    let features = this.get('model.features');
    let investments = this.get('model.investments');
    let structured = [];

    features.forEach(function(feature) {
      structured.push({ title: `${feature.get('name')} (Feature)`, id: feature.get('id'), type: 'feature' })
    });

    investments.forEach(function(investment) {
      structured.push({ title: `${investment.get('name')} (Investment)`, id: investment.get('id'), type: 'investment' })
    });

    return structured;
  }),
  actions: {
    transitionTo(selected) {
      let inflector = new Ember.Inflector(Ember.Inflector.defaultRules);
      let route = inflector.pluralize(selected['type']);
      let model = this.store.peekRecord(selected['type'], selected.id);
      this.transitionToRoute(`cities.city.${route}`, model.get('city.id'), model);
    }
  }
});

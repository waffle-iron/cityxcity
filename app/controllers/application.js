import Ember from 'ember';
// import GeneratorMixin from '../mixins/generator';
import computed from 'ember-computed';
import cartodbSql from '../utils/cartodb-sql';
import config from '../config/environment';

// const {
//   computed
// } = Ember;

let filters = config.APP.filters;

export default Ember.Controller.extend({
  queryParams: filters.uniqBy('alias').mapBy('alias'),
  // activating: true,
  // type: 'equity',
  // featureType: 'Food',
  // 'features.type': 'Food',


  // filterNames: computed(function() {
  //   let filters = this.get('cartodbMapFilters');

  //   return filters.uniqBy('name').mapBy('name').join();
  // }),

  // sql: sql('filterNames'),


  // eek.
  investmentsQuery: function() {
    return cartodbSql(filters.filterBy('table', 'investments').uniqBy('name'), this, 'investments');
  }.property(filters.filterBy('table', 'investments').uniqBy('alias').mapBy('alias').join()),

  featuresQuery: function() {
    return cartodbSql(filters.filterBy('table', 'features').uniqBy('name'), this, 'features');
  }.property(filters.filterBy('table', 'features').uniqBy('alias').mapBy('alias').join()),

  parcelsQuery: function() {
    return cartodbSql(filters.filterBy('table', 'parcels').uniqBy('name'), this, 'parcels');
  }.property(filters.filterBy('table', 'parcels').uniqBy('alias').mapBy('alias').join()),

  sqlMapping: function() {
    // order matters.
    return [this.get('parcelsQuery'),
            this.get('investmentsQuery'),
            this.get('featuresQuery')];
  }.property('investmentsQuery,featuresQuery,parcelsQuery')
});

function sql(namesProperty) {
  let names = this.get(namesProperty);

  return computed(...names, function() {
    let cartodbMapFilters = this.get('cartodbMapFilters');

    return cartodbSql(cartodbMapFilters);
  });
}


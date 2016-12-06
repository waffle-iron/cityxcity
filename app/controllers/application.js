import Ember from 'ember';
// import GeneratorMixin from '../mixins/generator';
import computed from 'ember-computed';
import cartodbSql from '../utils/cartodb-sql';
import config from '../config/environment';

// const {
//   computed
// } = Ember;

let filters = config.APP.filters;
let paramNames = filters.uniqBy('alias').mapBy('alias');

function makeSql(table) {
  return computed(...paramNames, function() {
    //let cartodbMapFilters = this.get('cartodbMapFilters');

    return cartodbSql(this, filters, table);
  });
}

export default Ember.Controller.extend({
  queryParams: filters.uniqBy('alias').mapBy('alias'),
  //queryParams: ['activating'],
  // activating: false,
  // type: 'equity',
  // featureType: 'Food',
  // 'features.type': 'Food',


  // filterNames: computed(() => {
  //   return filters.uniqBy('name').mapBy('name').join();
  // }),

  investmentsQuery: makeSql('investments'),
  featuresQuery: makeSql('features'),
  parcelsQuery: makeSql('parcels'),

  // cartodbQueries: {
  //   investments: [
  //     {
  //       name: 'value',
  //       alias: 'value'
  //     }
  //   ]
  // }

  // investmentsQuery: cartoQueryTable('investments')

  // eek.
  // investmentsQuery: function() {
  //   return cartodbSql(filters.filterBy('table', 'investments').uniqBy('name'), this, 'investments');
  // }.property(filters.filterBy('table', 'investments').uniqBy('alias').mapBy('alias').join()),

  // featuresQuery: function() {
  //   return cartodbSql(filters.filterBy('table', 'features').uniqBy('name'), this, 'features');
  // }.property(filters.filterBy('table', 'features').uniqBy('alias').mapBy('alias').join()),

  // parcelsQuery: function() {
  //   return cartodbSql(filters.filterBy('table', 'parcels').uniqBy('name'), this, 'parcels');
  // }.property(filters.filterBy('table', 'parcels').uniqBy('alias').mapBy('alias').join()),

  sqlMapping: function() {
    // order matters.
    return [this.get('parcelsQuery'),
            this.get('investmentsQuery'),
            this.get('featuresQuery')];
  }.property('investmentsQuery,featuresQuery,parcelsQuery')
});


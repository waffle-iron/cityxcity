import Ember from 'ember';
import isAnyFilter from '../utils/is-any-filter';
import isTrueFilter from '../utils/is-true-filter';
import isWithinFilter from '../utils/is-within-filter';
import arrayify from '../utils/arrayify';
import applyFiltersTo from '../utils/apply-filter-to';

import {  FEATURE_PARAMS, 
          FEATURE_TYPES,
          FEATURE_FILTERS_CONFIG } from '../models/feature';

import {  INVESTMENT_PARAMS,
          INVESTMENT_TYPES,
          INVESTMENT_FILTERS_CONFIG } from '../models/investment';

import {  PARCEL_PARAMS,
          PARCEL_TYPES,
          PARCEL_FILTERS_CONFIG } from '../models/parcel';

const SPECIAL_QUERYP_CONFIG = [ { 'activating' : { type: 'boolean' }}, 
                                { 'featureOpen': { type: 'boolean' }}, 
                                { 'forSale'    : { type: 'boolean' }}, 
                                { 'forLease'   : { type: 'boolean' }},
                                { 'employer'   : { type: 'boolean' }}];

export default Ember.Controller.extend({
  queryParams: ['showInvestments','showFeatures','showParcels']
                .concat(FEATURE_PARAMS, INVESTMENT_PARAMS, PARCEL_PARAMS, SPECIAL_QUERYP_CONFIG),
  currentCity: Ember.inject.service(),

  // features
  assetTypes: '',
  assetTypesArray: Ember.computed('assetTypes', arrayify('assetTypes', '|')),
  assetTypeOptions: FEATURE_TYPES,
  activating: null,
  featureOpen: null,
  employer: null,

  // investments
  investmentTypes: '',
  investmentTypesArray: Ember.computed('investmentTypes', arrayify('investmentTypes', '|')),
  investmentTypeOptions: INVESTMENT_TYPES,
  valueMin: 0,
  valueMax: null,

  // parcels 
  landuseTypes: '',
  landuseTypesArray: Ember.computed('landuseTypes', arrayify('landuseTypes', '|')),
  landuseTypeOptions: PARCEL_TYPES,
  groundFloorVacancyMin: 0,
  groundFloorVacancyMax: null,
  forSale: null,
  forLease: null,
  yearBuiltMin: 1700,
  yearBuiltMax: null,

  // UI state
  showInvestments: false,
  showFeatures: false,
  showParcels: false,

  visibleFeatures: Ember.computed(...FEATURE_PARAMS, 'currentCity.city.features', 
    applyFiltersTo('currentCity.city.features', FEATURE_FILTERS_CONFIG)),

  visibleInvestments: Ember.computed(...INVESTMENT_PARAMS, 'currentCity.city.investments', 
    applyFiltersTo('currentCity.city.investments', INVESTMENT_FILTERS_CONFIG)),

  visibleParcels: Ember.computed(...PARCEL_PARAMS, 'currentCity.city.parcels', 
    applyFiltersTo('currentCity.city.parcels', PARCEL_FILTERS_CONFIG)),

  actions: {
    selectCity(city) {
      let id = city.get('id');
      this.transitionToRoute('cities.city.details', id);
    },
    composeList(option, optionsList) {
      let list = this.get(optionsList).split('|');
      if(list.isAny('', option)) {
        list.removeObject(option);
      } else {
        list.pushObject(option);
      }
      this.set(optionsList, list.join('|'));
    }
  }
});

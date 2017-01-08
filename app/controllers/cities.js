import Ember from 'ember';
import isAnyFilter from '../utils/is-any-filter';
import isTrueFilter from '../utils/is-true-filter';
import isWithinFilter from '../utils/is-within-filter';

const SPECIAL_QUERYP_CONFIG = [ { 'activating' : { type: 'boolean' }}, 
                                { 'featureOpen': { type: 'boolean' }}, 
                                { 'forSale'    : { type: 'boolean' }}, 
                                { 'forLease'   : { type: 'boolean' }},
                                { 'employer'   : { type: 'boolean' }}];

const FEATURE_PARAMS = ['assetTypes', 'activating', 'featureOpen', 'employer'];
const FEATURE_TYPES  = ['Food','Business','Retail','Community','Cultural & Entertainment','Health Care','Government','Temporary','Park / Open Space','Parking','Public Transit'];

const INVESTMENT_PARAMS = ['investmentTypes'];
const INVESTMENT_TYPES  = ['MassDev Direct','State Direct (non-MassDev)','Other Public Agency','Private','Public-Private'];

const PARCEL_PARAMS = ['groundFloorVacancyMin','groundFloorVacancyMax','landuseTypes','forSale','forLease','yearBuiltMin','yearBuiltMax'];
const PARCEL_TYPES  = ['Residential','Commercial Office','Commercial Other','Industrial','Institutional, Other, or Unknown'];

export default Ember.Controller.extend({
  queryParams: ['showInvestments','showFeatures','showParcels']
                .concat(FEATURE_PARAMS, INVESTMENT_PARAMS, PARCEL_PARAMS, SPECIAL_QUERYP_CONFIG),
  currentCity: Ember.inject.service(),

  // features
  assetTypes: '',
  assetTypesArray: Ember.computed('assetTypes', {
    get() {
      if (!this.get('assetTypes')) return [];
      return this.get('assetTypes').split('|');
    }
  }),
  assetTypeOptions: Ember.computed('', function() {
    return Ember.A(FEATURE_TYPES);
  }),
  activating: null,
  featureOpen: null,
  employer: null,

  // investments
  investmentTypes: '',
  investmentTypesArray: Ember.computed('investmentTypes', {
    get() {
      if (!this.get('investmentTypes')) return [];
      return this.get('investmentTypes').split('|');
    }
  }),
  investmentTypeOptions: Ember.computed('', function() {
    return Ember.A(INVESTMENT_TYPES);
  }),
  valueMin: 0,
  valueMax: null,

  // parcels 
  landuseTypes: '',
  landuseTypesArray: Ember.computed('landuseTypes', {
    get() {
      if (!this.get('landuseTypes')) return [];
      return this.get('landuseTypes').split('|');
    }
  }),
  landuseTypeOptions: Ember.computed('', function() {
    return Ember.A(PARCEL_TYPES);
  }),
  groundFloorVacancyMin: 0,
  groundFloorVacancyMax: null,
  forSale: null,
  forLease: null,
  yearBuiltMin: 1700,
  yearBuiltMax: null,

  showInvestments: false,
  showFeatures: false,
  showParcels: false,

  visibleFeatures: Ember.computed(...FEATURE_PARAMS, 'currentCity.city.features', function() {
    let features = this.get('currentCity.city.features');
    let { assetTypesArray, activating, featureOpen, employer } 
        = this.getProperties('assetTypesArray', 'activating', 'featureOpen', 'employer');

    return features
      .filter(isAnyFilter.bind(this, assetTypesArray, 'assetType'))
      .filter(isTrueFilter.bind(this, activating, 'activating'))
      .filter(isTrueFilter.bind(this, featureOpen, 'isOpen'))
      .filter(isTrueFilter.bind(this, employer, 'employer'));
  }),

  visibleInvestments: Ember.computed(...INVESTMENT_PARAMS, 'currentCity.city.investments', function() {
    let investments = this.get('currentCity.city.investments');
    let { investmentTypesArray, valueMin, valueMax } 
        = this.getProperties('investmentTypesArray', 'valueMin', 'valueMax');

    return investments
      .filter(isAnyFilter.bind(this, investmentTypesArray, 'type'))
      .filter(isWithinFilter.bind(this, valueMin, valueMax, 'value'));
  }),

  visibleParcels: Ember.computed(...PARCEL_PARAMS, 'currentCity.city.parcels', function() {
    let parcels = this.get('currentCity.city.parcels');
    let { landuseTypesArray, yearBuiltMin, yearBuiltMax, forSale, forLease }
        = this.getProperties('landuseTypesArray', 'yearBuiltMin', 'yearBuiltMax', 'forSale', 'forLease');

    return parcels
      .filter(isAnyFilter.bind(this, landuseTypesArray, 'landUseType'))
      .filter(isTrueFilter.bind(this, forSale, 'forSale'))
      .filter(isTrueFilter.bind(this, forLease, 'forLease'))
      .filter(isWithinFilter.bind(this, yearBuiltMin, yearBuiltMax, 'yearBuilt'));
  }),

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

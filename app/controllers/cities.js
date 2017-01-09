import Ember from 'ember';
import isAnyFilter from '../utils/is-any-filter';
import isTrueFilter from '../utils/is-true-filter';
import isWithinFilter from '../utils/is-within-filter';
import arrayify from '../utils/arrayify';
import applyFiltersTo from '../utils/apply-filter-to';

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
    applyFiltersTo('currentCity.city.features', [
      { 
        property: 'assetType',
        filter: 'assetTypesArray',
        filterType: 'isAny'
      },
      { 
        property: 'activating',
        filter: 'activating',
        filterType: 'isTrue'
      },
      {
        property: 'isOpen',
        filter: 'featureOpen',
        filterType: 'isTrue'
      },
      {
        property: 'employer',
        filter: 'employer',
        filterType: 'isTrue'
      }
    ])),

  // visibleInvestments: Ember.computed(...FEATURE_PARAMS, 'currentCity.city.investments', 
  //   applyFiltersTo('currentCity.city.investments', [
  //     { 
  //       property: 'type',
  //       filter: 'investmentTypesArray',
  //       filterType: 'isAny'
  //     },
  //     { 
  //       property: 'activating',
  //       filter: 'activating',
  //       filterType: 'isWithin'
  //     }
  //   ])),

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

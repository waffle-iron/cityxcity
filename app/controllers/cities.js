import Ember from 'ember';

const ACTIVATING = 'activating';
const FEATURE_PARAMS = ['assetTypes', 'activating', 'featureOpen', 'employer'];
const SPECIAL_QUERYP_CONFIG = [{ 'activating': { type: 'boolean' }}, 
                              { 'featureOpen': { type: 'boolean' }}, 
                              { 'forSale': { type: 'boolean' }}, 
                              { 'forLease': { type: 'boolean' }},
                              { 'employer': { type: 'boolean' }}];
const FEATURE_TYPES = ['Food','Business','Retail','Community','Cultural & Entertainment','Health Care','Government','Temporary','Park / Open Space','Parking','Public Transit'];

const INVESTMENT_PARAMS = ['investmentTypes'];
const INVESTMENT_TYPES = ['MassDev Direct','State Direct (non-MassDev)','Other Public Agency','Private','Public-Private'];

const PARCEL_PARAMS = ['groundFloorVacancyMin','groundFloorVacancyMax','landuseTypes','forSale','forLease','yearBuiltMin','yearBuiltMax'];
const PARCEL_TYPES = ['Residential','Commercial Office','Commercial Other','Industrial','Institutional, Other, or Unknown'];

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
    let assetTypes = this.get('assetTypesArray');
    let activating = this.get('activating');
    let featureOpen = this.get('featureOpen');
    let employer = this.get('employer');

    return features
      .filter((feature) => {
        if(assetTypes.length <= 1) return true;
        return assetTypes.isAny('', feature.get('assetType'));
      })
      .filter((feature) => {
        if(!activating) return true;
        return feature.get('activating') === activating;
      })
      .filter((feature) => {
        if(!featureOpen) return true;
        return feature.get('isOpen') === featureOpen;
      })
      .filter((feature) => {
        if(!employer) return true;
        return feature.get('employer') === employer;
      });
  }),

  visibleInvestments: Ember.computed(...INVESTMENT_PARAMS, 'currentCity.city.investments', function() {
    let investments = this.get('currentCity.city.investments');
    let investmentTypes = this.get('investmentTypesArray');
    let valueMin = this.get('valueMin');
    let valueMax = this.get('valueMax');

    return investments
      .filter((investment) => {
        if(investmentTypes.length <= 1) return true;
        return investmentTypes.isAny('', investment.get('type'));
      })
      .filter((investment) => {
        if(!(valueMin && valueMax)) return true;
        let value = investment.get('value');
        return (value >= valueMin) && (value <= valueMax);
      });
  }),

  visibleParcels: Ember.computed(...PARCEL_PARAMS, 'currentCity.city.parcels', function() {
    let parcels = this.get('currentCity.city.parcels');
    let landuseTypes = this.get('landuseTypesArray');
    let yearBuiltMin = this.get('yearBuiltMin');
    let yearBuiltMax = this.get('yearBuiltMax');
    let forSale = this.get('forSale');
    let forLease = this.get('forLease');

    return parcels
      .filter((parcel) => {
        if(landuseTypes.length <= 1) return true;
        return landuseTypes.isAny('', parcel.get('landUseType'));
      })
      .filter((parcel) => {
        if(!forSale) return true;
        return parcel.get('forSale') === forSale;
      })
      .filter((parcel) => {
        if(!forLease) return true;
        return parcel.get('forLease') === forLease;
      })
      .filter((parcel) => {
        if(!(yearBuiltMin && yearBuiltMax)) return true;
        let value = parcel.get('yearBuilt');
        return (value >= yearBuiltMin) && (value <= yearBuiltMax);
      });
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

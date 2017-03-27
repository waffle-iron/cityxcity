import Ember from 'ember';
import arrayify from '../utils/arrayify';
import applyFiltersTo, { getFilter } from '../utils/apply-filter-to';
import setChoroplethColor from '../utils/set-choropleth-color';
import { number_format } from 'ember-string-helpers/utils/functions';
import { nest } from 'd3-collection';
import monthsBetween from '../utils/months-between';
import config from '../config/environment';

import {  FEATURE_PARAMS, 
          FEATURE_TYPES,
          FEATURE_FILTERS_CONFIG } from '../models/feature';

import {  INVESTMENT_PARAMS,
          INVESTMENT_TYPES,
          INVESTMENT_STATUSES,
          INVESTMENT_SOURCES,
          INVESTMENT_FILTERS_CONFIG } from '../models/investment';

import {  PARCEL_PARAMS,
          PARCEL_TYPES,
          PARCEL_FILTERS_CONFIG,
          PARCEL_MAP_CONFIG } from '../models/parcel';

const SPECIAL_QUERYP_CONFIG = [ { 'activating'                : { type: 'boolean' }}, 
                                { 'featureOpen'               : { type: 'boolean' }}, 
                                { 'forSale'                   : { type: 'boolean' }}, 
                                { 'forLease'                  : { type: 'boolean' }},
                                { 'employer'                  : { type: 'boolean' }},
                                { 'is_employer'               : { type: 'boolean' } },
                                { 'is_street_activating'      : { type: 'boolean' } },
                                { 'is_tdi_asset'             : { type: 'boolean' } },
                                { 'is_feature_owner_engaged'  : { type: 'boolean' } },
                                { 'is_collision_point'        : { type: 'boolean' } } ];
export default Ember.Controller.extend({
  queryParams: ['showInvestments','showFeatures','showParcels']
                .concat(Ember.copy(FEATURE_PARAMS).removeObject('fake_open_or_closed'), 
                        INVESTMENT_PARAMS, 
                        PARCEL_PARAMS, 
                        SPECIAL_QUERYP_CONFIG),
  currentCity: Ember.inject.service(),

  // features
  assetTypes: '',
  assetTypesArray: Ember.computed('assetTypes', arrayify('assetTypes', '|')),
  assetTypeOptions: FEATURE_TYPES,
  activating: null,
  featureOpen: null,
  employer: null,
  fake_open_or_closed: null,
  investments_fake_open_or_closed: null,
  featuresOpenDates: Ember.computed('currentCity.city.features.[]', 'currentCity.city.investments.[]', function() {
    let dates = Ember.A();
    this.get('currentCity.city.features').forEach((feature) => { dates.pushObjects(feature.get('datesOpen')); });
    this.get('currentCity.city.investments').forEach((investment) => { dates.pushObjects(investment.get('datesOpen')); });
    dates = dates.sortBy(function(o){ return new Date( o.date ) }).mapBy('date');
    let min = dates[0];
    let max = dates[dates.length-1];

    return monthsBetween(min, max, 'MMM \'YY');

    // let grouped = nest()
    //             .key((d) => { return d.date })
    //             .key((d) => { return d.type })
    //             .rollup((d) => { return d.length; })
    //             // .key((d) => { return d.key })
    //             .entries(dates)
    //             .sortBy((el) => { return el.key; });

    // grouped = grouped.map((el) => { 
    //   let date = new Date(el.key);
    //   let obj = { key: `${date.getFullYear()}-${date.getMonth()}-01` };
    //   let type1 = el.values[0];
    //   let type2 = el.values[1];

    //   if(type1) {
    //     obj[type1.key] = type1.value;
    //   }

    //   if(type2) {
    //     obj[type2.key] = type2.value;
    //   }
      
    //   return obj;
    // });

    // console.log(grouped);

    
  }),

  // investments
  investmentTypes: '',
  investmentTypesArray: Ember.computed('investmentTypes', arrayify('investmentTypes', '|')),
  investmentTypeOptions: INVESTMENT_TYPES,

  investmentStatuses: '',
  investmentStatusesArray: Ember.computed('investmentStatuses', arrayify('investmentStatuses', '|')),
  investmentStatusesOptions: INVESTMENT_STATUSES,

  investmentSources: '',
  investmentSourcesArray: Ember.computed('investmentSources', arrayify('investmentSources', '|')),
  investmentSourcesOptions: INVESTMENT_SOURCES,

  allInvestments: Ember.computed.alias('currentCity.city.investments'),
  amounts_estimates: Ember.computed.mapBy('allInvestments', 'amount_estimated'),
  amountsMin: Ember.computed.min('amounts_estimates'),
  amountsMax: Ember.computed.max('amounts_estimates'),

  valueMin: 0,
  valueMax: 20000000,

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
  basemap: 'default',

  choroplethLayer: 'forSaleLease',
  parcelsChoroplethMapping: Ember.computed('visibleParcels', 'choroplethLayer', function() {
    return (feature) => {
      let color = setChoroplethColor(feature, this.get('choroplethLayer'), PARCEL_MAP_CONFIG);
      let stroke = true;
      return {
        color,
        stroke
      }
    }
  }),
  parcelChoroplethSets: PARCEL_MAP_CONFIG.mapBy('setName'),
  iconCreateFunction: function(cluster) {
    // cluster.getChildCount()
    return L.icon({ iconUrl: `${config.prepend ? config.prepend : '/'}images/icons/investments/cluster.png`, iconSize: [41,41] });
  },

  currentFeature: null,
  hideSidebar: false,

  // applied computed filters
  visibleFeatures: Ember.computed(...FEATURE_PARAMS, 'currentCity.city.features', 
    applyFiltersTo('currentCity.city.features', FEATURE_FILTERS_CONFIG)),

  visibleInvestments: Ember.computed(...INVESTMENT_PARAMS, 'currentCity.city.investments', 
    applyFiltersTo('currentCity.city.investments', INVESTMENT_FILTERS_CONFIG)),

  visibleParcels: Ember.computed(...PARCEL_PARAMS, 'currentCity.city.parcels', 
    applyFiltersTo('currentCity.city.parcels', PARCEL_FILTERS_CONFIG)),


  // filterParcelsTask: task(function*() {
  //   return getFilter('currentCity.city.parcels', PARCEL_FILTERS_CONFIG);
  // }),


  actions: {
    // loadVisibleParcels() {
    //   let filterParcelsTask = this.get('filterParcelsTask');
    //   filterParcelsTask.perform();
    // },

    // in cities template:
    // {{#if filterParcelsTask.isRunning}}
    //   loading
    // {{else}}
    //    render map stuff
    // {{/if}}

    selectCity(city) {
      let id = city.get('id');
      this.transitionToRoute('cities.city.city-filters', id);
    },
    initMap(event) {
      let map = event.target;
      let currentCity = this.get('currentCity');
      this.set('mapInstance', map);

      map.zoomControl.setPosition('topright');

      map.createPane('points');
      map.getPane('points').style.zIndex = 325;

      map.createPane('extrusions');
      map.getPane('extrusions').style.zIndex = 950;
      map.getPane('extrusions').style.pointerEvents = 'none';

      map.createPane('parcels');
      map.getPane('parcels').style.zIndex = 375;

      currentCity.set('mapInstance', map);
    },
    composeList(option, optionsList) {
      let list = this.get(optionsList).split('|');
      if(list.isAny('', option)) {
        list.removeObject(option);
      } else {
        list.pushObject(option);
      }
      this.set(optionsList, list.join('|'));
    },
    updateRanges(test) {
      this.set('valueMin', test[0]);
      this.set('valueMax', test[1]);
    },
    openModal(name, feature) {
      $('.ui.' + name + '.modal').modal('show');
      this.set('currentFeature', feature);
    },
    linkTo(route, model) {
      console.log(model.get('id'));
      this.transitionToRoute(route, model);
    },
    changeProperty(key, value) {
      this.set(key, value);
    },
    toggleSidebar() {
      let map = this.get('mapInstance');
      this.toggleProperty('hideSidebar');
      Ember.run.next(this, () => {
        $('.list-results')
          .transition({
            animation: 'fade right',
            className: {
              'hidden': 'hidden-custom'
            },
            onStart() {
              map.invalidateSize();
            },
            onComplete() {
              map.invalidateSize();
            }
          });
        ;
      });

    },
    updateNewPoint(map) {
      let currentCity = this.get('currentCity');
      let center = map.target.getCenter();

      Ember.run.next(this, () => {
        currentCity.setProperties({
          'newPointLatitude': center.lat,
          'newPointLongitude': center.lng 
        });
      });
    },
    currentMapState(map) {
      let center = map.target.getCenter();
      let zoom = map.target.getZoom();
      let layerPoint = map.target.project(center).divideBy(256).floor();
      let currentCity = this.get('currentCity');

      Ember.run.next(this, () => {
        this.setProperties({
          layerPointx: layerPoint.x,
          layerPointy: layerPoint.y,
          layerPointz: zoom
        });

        currentCity.setProperties({
          'selectedPointLatitude': currentCity.newPointLatitude,
          'selectedPointLongitude': currentCity.newPointLongitude 
        });
      });
    },
    zoomChanged(map) {
    },
    updateDate(date){
      this.set('fake_open_or_closed', new Date(date));
      this.set('investments_fake_open_or_closed', new Date(date));
    }
  },

  investmentsValues: Ember.computed.mapBy('visibleInvestments', 'value'),
  maxInvestments: Ember.computed.max('investmentsValues', 'visibleInvestments'),

  tooltipsConfig: [
    { to: (num) => number_format(num, 0) },
    { to: (num) => number_format(num, 0) }
  ]
});

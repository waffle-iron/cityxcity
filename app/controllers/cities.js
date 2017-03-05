import Ember from 'ember';
import arrayify from '../utils/arrayify';
import applyFiltersTo, { getFilter } from '../utils/apply-filter-to';
import setChoroplethColor from '../utils/set-choropleth-color';
import { number_format } from 'ember-string-helpers/utils/functions';

import {  FEATURE_PARAMS, 
          FEATURE_TYPES,
          FEATURE_FILTERS_CONFIG } from '../models/feature';

import {  INVESTMENT_PARAMS,
          INVESTMENT_TYPES,
          INVESTMENT_FILTERS_CONFIG } from '../models/investment';

import {  PARCEL_PARAMS,
          PARCEL_TYPES,
          PARCEL_FILTERS_CONFIG,
          PARCEL_MAP_CONFIG } from '../models/parcel';

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
  valueMin: 1,
  valueMax: 105000000,

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
      map.createPane('extrusions');
      map.getPane('extrusions').style.zIndex = 350;
      map.getPane('extrusions').style.pointerEvents = 'none';
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
      console.log("zoom changed");
    }
  },

  investmentsValues: Ember.computed.mapBy('visibleInvestments', 'value'),
  maxInvestments: Ember.computed.max('investmentsValues', 'visibleInvestments'),

  tooltipsConfig: [
    { to: (num) => number_format(num, 0) },
    { to: (num) => number_format(num, 0) }
  ]
});

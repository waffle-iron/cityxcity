import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  name: DS.attr('string'),
  address: DS.attr('string'),
  contact: DS.attr('string'),
  landUseType: DS.attr('string'),
  yearBuilt: DS.attr('date'),
  forLease: DS.attr('boolean'),
  forSale: DS.attr('boolean'),
  geom: DS.attr(),
  geojson: Ember.computed('geom', function() {
    return JSON.parse(this.get('geom'));
  }),
  city: DS.belongsTo('city')
});

export const PARCEL_PARAMS = ['groundFloorVacancyMin','groundFloorVacancyMax','landuseTypes','forSale','forLease','yearBuiltMin','yearBuiltMax'];
export const PARCEL_TYPES  = ['Residential','Commercial Office','Commercial Other','Industrial','Institutional, Other, or Unknown'];
export const PARCEL_FILTERS_CONFIG = [
      { 
        property: 'landUseType',
        filter: 'landuseTypesArray',
        filterType: 'isAny'
      },
      { 
        property: 'forSale',
        filter: 'forSale',
        filterType: 'isTrue'
      },
      { 
        property: 'forLease',
        filter: 'forLease',
        filterType: 'isTrue'
      },
      { 
        property: 'yearBuilt',
        filter: ['yearBuiltMin', 'yearBuiltMax'],
        filterType: 'isWithin'
      }
    ];

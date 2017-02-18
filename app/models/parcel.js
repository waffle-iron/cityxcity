import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  name: DS.attr('string'),
  address: DS.attr('string'),
  contact: DS.attr('string'),
  landUseType: DS.attr('number'),
  yearBuilt: DS.attr('date'),
  forLease: DS.attr('boolean'),
  vacancy: DS.attr('number'),
  marked: DS.attr('boolean'),
  forSale: DS.attr('boolean'),
  geom: DS.attr(),
  geojson: Ember.computed('geom', function() {
    let geojson = Ember.Object.create();
    let properties = Object.keys(this.toJSON()).removeObjects(['geom','city']);

    geojson.set('properties', this.getProperties(properties));
    geojson.set('type', 'Feature');
    geojson.set('geometry', JSON.parse(this.get('geom')));

    return geojson;
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
export const PARCEL_MAP_CONFIG = [
  {
    setName: 'forSaleLease',
    default_color: 'green',
    colorMap: [
      {
        key: 'forLease',
        value: true,
        color: 'red'
      },
      {
        key: 'forSale',
        value: true,
        color: 'purple'
      }
    ]
  },
  {
    setName: 'landUse',
    default_color: 'blue',
    colorMap: [
      {
        key: 'landUseType',
        value: 1,
        color: 'yellow'
      },
      {
        key: 'landUseType',
        value: 2,
        color: 'red'
      },
      {
        key: 'landUseType',
        value: 4,
        color: 'purple'
      },
      {
        key: 'landUseType',
        value: 9,
        color: 'rgb(180,180,180)'
      }
    ]
  },
  {
    setName: 'vacancy',
    default_color: 'blue',
    colorMap: [
      {
        key: 'vacancy',
        value: 1,
        color: 'red'
      },
      {
        key: 'vacancy',
        value: 2,
        color: 'blue'
      },
      {
        key: 'vacancy',
        value: 3,
        color: 'purple'
      }
    ]
  },
  {
    setName: 'ownership',
    default_color: 'blue',
    colorMap: [
      {
        key: 'marked',
        value: true,
        color: 'red'
      },
      {
        key: 'marked',
        value: false,
        color: 'blue'
      }
    ]
  }
];

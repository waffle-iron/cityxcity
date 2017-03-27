import DS from 'ember-data';
import Ember from 'ember';
import { faker } from 'ember-cli-mirage';

export default DS.Model.extend({
  name: DS.attr('string'),
  address: DS.attr('string'),
  contact: DS.attr('string'),
  landUseType: DS.attr('string'),
  yearBuilt: DS.attr('date'),
  // forLease: DS.attr('boolean'),
  vacancy: DS.attr('number'),
  ground_floor_vacancy: DS.attr('string'),
  upper_floor_vacancy: DS.attr('string'),
  marked: DS.attr('boolean'),
  // forSale: DS.attr('boolean'),

  forLease: Ember.computed(function() {
    return faker.random.boolean();
  }),
  forSale: Ember.computed(function() {
    return faker.random.boolean();
  }),

  ownership_type: DS.attr('string'),
  is_engaged_owner: DS.attr('timeline'),
  is_for_sale: DS.attr('timeline'),
  is_for_lease: DS.attr('timeline'),
  is_vacant_lot: DS.attr('timeline'),
  ground_floor_vacancy: DS.attr('timeline'),
  upper_floor_vacancy: DS.attr('timeline'),
  land_use: DS.attr('string'),
  zoning: DS.attr('string'),
  parcel_id: DS.attr('string'),
  own_contact_name: DS.attr('string'),
  own_contact_role: DS.attr('string'),
  own_contact_organization: DS.attr('string'),
  own_contact_phone: DS.attr('string'),
  own_contact_email: DS.attr('string'),
  priv_contact_name: DS.attr('string'),
  priv_contact_organization: DS.attr('string'),
  priv_contact_role: DS.attr('string'),
  priv_contact_phone: DS.attr('string'),
  priv_contact_email: DS.attr('string'),
  priv_contact_website: DS.attr('string'),
  priv_notes: DS.attr('string'),
  pub_notes: DS.attr('string'),
  cta_text: DS.attr('string'),
  cta_contact: DS.attr('string'),
  pub_contact_1: DS.attr('string'),
  pub_contact_org_1: DS.attr('string'),
  pub_contact_role_1: DS.attr('string'),
  pub_contact_phone_1: DS.attr('string'),
  pub_contact_email_1: DS.attr('string'),
  pub_contact_website_1: DS.attr('string'),
  pub_contact_2: DS.attr('string'),
  pub_contact_org_2: DS.attr('string'),
  pub_contact_role_2: DS.attr('string'),
  pub_contact_phone_2: DS.attr('string'),
  pub_contact_email_2: DS.attr('string'),
  pub_contact_website_2: DS.attr('string'),

  splash: Ember.computed('latitude,longitude', function() {
    let { latitude, longitude } = this.getProperties('latitude','longitude');
    return `https://maps.googleapis.com/maps/api/streetview?size=450x450&location=${latitude},${longitude}&key=AIzaSyCO654zBIabvjSOV4Ys59Pku8pmzM387ps`;
  }),
  geom: DS.attr(),
  latitude: Ember.computed('geojson', function() {
    let geojson=this.get('geojson');
    return L.geoJSON(geojson).getBounds().getCenter().lat;
  }),
  longitude: Ember.computed('geojson', function() {
    let geojson=this.get('geojson');
    return L.geoJSON(geojson).getBounds().getCenter().lng;
  }),
  geojson: Ember.computed('geom', function() {
    let geojson = Ember.Object.create();
    let computed_properties = ['forLease', 'forSale', 'vacancy'];
    let properties = Object.keys(this.toJSON()).removeObjects(['geom','city']).concat(computed_properties);

    geojson.set('properties', this.getProperties(properties));
    geojson.set('type', 'Feature');
    geojson.set('geometry', JSON.parse(this.get('geom')));

    return geojson;
  }),
  city: DS.belongsTo('city'),

  isSelected: false
});

export const PARCEL_PARAMS = ['groundFloorVacancyMin','groundFloorVacancyMax','landuseTypes','forSale','forLease','yearBuiltMin','yearBuiltMax'];
export const PARCEL_TYPES  = ['1','3','4','9'];
export const PARCEL_OWNERSHIP_TYPES  = ['Publicly owned','Partner-Controlled','Privately owned'];
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
        value: 3,
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
        color: 'green'
      }
    ]
  }
  // {
  //   setName: 'vacancy',
  //   default_color: 'blue',
  //   colorMap: [
  //     {
  //       key: 'vacancy',
  //       value: 1,
  //       color: 'red'
  //     },
  //     {
  //       key: 'vacancy',
  //       value: 2,
  //       color: 'blue'
  //     },
  //     {
  //       key: 'vacancy',
  //       value: 3,
  //       color: 'purple'
  //     }
  //   ]
  // },
  // {
  //   setName: 'ownership',
  //   default_color: 'blue',
  //   colorMap: [
  //     {
  //       key: 'marked',
  //       value: true,
  //       color: 'red'
  //     },
  //     {
  //       key: 'marked',
  //       value: false,
  //       color: 'blue'
  //     }
  //   ]
  // }
];

import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  splash: DS.attr('string'),
  latitude: DS.attr('number'),
  longitude: DS.attr('number'),
  features: DS.hasMany('feature'),
  fellows: DS.attr('boolean'),
  parcels: DS.hasMany('parcel'),
  investments: DS.hasMany('investment')
});

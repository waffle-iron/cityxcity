import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  name: DS.attr('string'),
  // splash: Ember.computed('latitude,longitude', function() {
  //   let { latitude, longitude } = this.getProperties('latitude','longitude');
  //   return `https://maps.googleapis.com/maps/api/streetview?size=250x250&location=${latitude},${longitude}&key=AIzaSyCO654zBIabvjSOV4Ys59Pku8pmzM387ps`;
  // }),
  splash: DS.attr('string'),
  latitude: DS.attr('number'),
  longitude: DS.attr('number'),
  features: DS.hasMany('feature'),
  fellows: DS.attr('boolean'),
  parcels: DS.hasMany('parcel'),
  investments: DS.hasMany('investment')
});

import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  name: DS.attr('string'),
  // splash: Ember.computed('latitude,longitude', function() {
  //   let { latitude, longitude } = this.getProperties('latitude','longitude');
  //   return `https://maps.googleapis.com/maps/api/streetview?size=250x250&location=${latitude},${longitude}&key=AIzaSyCO654zBIabvjSOV4Ys59Pku8pmzM387ps`;
  // }),
  imageOverlay: DS.attr('string'),
  imageOverlayBBox: DS.attr(),
  splash: DS.attr('string'),
  latitude: DS.attr('number'),
  longitude: DS.attr('number'),

  cta_text: DS.attr('string'),
  cta_contact: DS.attr('string'),
  cta_contact_org: DS.attr('string'),
  cta_contact_role: DS.attr('string'),
  cta_contact_phone: DS.attr('string'),
  cta_contact_email: DS.attr('string'),
  feature_cta_default: DS.attr('string'),
  investment_cta_default: DS.attr('string'),
  parcel_cta_default: DS.attr('string'),

  features: DS.hasMany('feature'),
  fellows: DS.attr('boolean'),
  parcels: DS.hasMany('parcel'),
  investments: DS.hasMany('investment')
});

import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  address: DS.attr('string'),
  contact: DS.attr('string'),
  landUseType: DS.attr('string'),
  yearBuilt: DS.attr('date'),
  forLease: DS.attr('boolean'),
  forSale: DS.attr('boolean'),
  geom: DS.attr(),
  city: DS.belongsTo('city')
});

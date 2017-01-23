import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  address: DS.attr('string'),
  contact: DS.attr('string'),
  geom: DS.attr(),
  city: DS.belongsTo('city')
});

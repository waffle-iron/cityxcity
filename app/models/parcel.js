import DS from 'ember-data';

export default DS.Model.extend({
  city: DS.belongsTo('city'),
  name: DS.attr('string'),
  address: DS.attr('string'),
  contact: DS.attr('string'),
  geom: DS.attr()
});

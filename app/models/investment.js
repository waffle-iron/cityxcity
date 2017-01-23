import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr("string"),
  address: DS.attr("string"),
  contact: DS.attr("string"),
  employer: DS.attr("string"),
  activating: DS.attr("string"),
  latitude: DS.attr("number"),
  longitude: DS.attr("number"),
  city: DS.belongsTo("city")
});

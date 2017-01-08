import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr("string"),
  address: DS.attr("string"),
  contact: DS.attr("string"),
  employer: DS.attr("string"),
  activating: DS.attr("boolean"),
  assetType: DS.attr("string"),
  subtype: DS.attr("string"),
  comment: DS.attr("string"),
  opendate: DS.attr("date"),
  closedate: DS.attr("date"),
  isOpen: Ember.computed('closedate', function() {
    let closedate = this.get('closedate');
    if (!closedate) return true;
    return false;
  }),
  latitude: DS.attr("number"),
  longitude: DS.attr("number"),
  city: DS.belongsTo("city")
});
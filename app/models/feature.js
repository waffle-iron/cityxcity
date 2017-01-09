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
  splash: DS.attr("string"),
  isOpen: Ember.computed('closedate', function() {
    let closedate = this.get('closedate');
    if (!closedate) return true;
    return false;
  }),
  latitude: DS.attr("number"),
  longitude: DS.attr("number"),
  city: DS.belongsTo("city")
});

export const FEATURE_PARAMS = ['assetTypes', 'activating', 'featureOpen', 'employer'];
export const FEATURE_TYPES  = ['Food','Business','Retail','Community','Cultural & Entertainment','Health Care','Government','Temporary','Park / Open Space','Parking','Public Transit'];
export const FEATURE_FILTERS_CONFIG = [
      { 
        property: 'assetType',
        filter: 'assetTypesArray',
        filterType: 'isAny'
      },
      { 
        property: 'activating',
        filter: 'activating',
        filterType: 'isTrue'
      },
      {
        property: 'isOpen',
        filter: 'featureOpen',
        filterType: 'isTrue'
      },
      {
        property: 'employer',
        filter: 'employer',
        filterType: 'isTrue'
      }
    ];

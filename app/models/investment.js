import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr("string"),
  address: DS.attr("string"),
  contact: DS.attr("string"),
  employer: DS.attr("string"),
  activating: DS.attr("string"),
  latitude: DS.attr("number"),
  longitude: DS.attr("number"),
  type: DS.attr("string"),
  city: DS.belongsTo("city")
});

export const INVESTMENT_PARAMS = ['investmentTypes'];
export const INVESTMENT_TYPES  = ['MassDev Direct','State Direct (non-MassDev)','Other Public Agency','Private','Public-Private'];
export const INVESTMENT_FILTERS_CONFIG = [
      { 
        property: 'type',
        filter: 'investmentTypesArray',
        filterType: 'isAny'
      },
      { 
        property: 'value',
        filter: ['valueMin', 'valueMax'],
        filterType: 'isWithin'
      }
    ];
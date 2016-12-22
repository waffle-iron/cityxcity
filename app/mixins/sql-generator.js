import Ember from 'ember';
import squel from 'npm:squel';

export default Ember.Mixin.create({
  squel: squel.select(),
  init: function() {
    // equivalence: WHERE {col} = {filter}
    // boolean: WHERE {col} IS {state}
    // range: WHERE {col} BETWEEN {filterFrom} AND {filterTo}
    // let queryParams = this.get('queryParams');
    let filters = this.get('cartodbMapFilters');

    // needs to group by table
    // so it returns one query string for one table
    if(filters) {
      filters.forEach((col) => {
        this.buildQueryFromType(col);
      });
    }
  },
  sql: function() {
    return this.squel.toString();
  }.property(),
  buildQueryFromType: function(col) {
    switch(col.type) {
      case "boolean": {
        this.squel.where(col.name + " = " + this.get(col.name));
        break;
      }
      case "range": {
        let propertyValue = this.get(col.name);
        let parsedRangeArray = this.parsedRangeArray(propertyValue);
        this.squel.where(col.name + " BETWEEN " + parsedRangeArray[0] + " AND " + parsedRangeArray[1]);
        break;
      }
      default:
        this.squel.where(col.name + " = " + this.get(col.name));
    }
  },
  parsedRangeArray: function(string) {
    return JSON.parse(string);
  }
});

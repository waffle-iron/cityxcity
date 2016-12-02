import Ember from 'ember';
import squel from 'npm:squel';

export default Ember.Object.extend({
  squel: null,
  init() {
    this._super(...arguments);
    this.set('squel', new squel.select());
    this.runCols();
  },
  bindColumns: function() {
    let context = this.get('context');
    let buildObj={};
    
    this.get('filters').forEach((el) => {
      buildObj[el] = Ember.computed.alias(`context.${el}`);
    });
    return Ember.Object.extend(buildObj).create({ context: this.get('context') });
  }.property('context.cartodbMapFilters.@each'),
  runCols: function() {
    this.get('filters').forEach((col) => {
      this.buildQueryFromType(col);
    });  
  },
  buildQueryFromType: function(col) {
    this.set('squel', null);
    this.set('squel', new squel.select());
    switch(col.type) {
      case "boolean":
        this.get('squel').where(col.name + " = " + this.get('context.' + col.name));
        break;
      case "range":
        let propertyValue = this.get('context.' + col.name);
        let parsedRangeArray = this.parsedRangeArray(propertyValue);
        this.get('squel').where(col.name + " BETWEEN " + parsedRangeArray[0] + " AND " + parsedRangeArray[1]);
        break;
      default:
        this.get('squel').where(col.name + " = " + this.get('context.' + col.name));
    }

    this.set('newSql', this.squel.toString());
  },
  parsedRangeArray: function(string) {
    return JSON.parse(string);
  },
  sql: function() {
    this.runCols();

    return this.get('squel').toString();
  }.property('bindColumns.{}')
});
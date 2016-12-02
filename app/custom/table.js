import Ember from 'ember';
import squel from 'npm:squel';
import Col from '../custom/col';

export default Ember.Object.extend({
  squel: new squel.select(),
  cols: [],
  generateCols: function() {
    this.get('filters').forEach((el) => {
      this.get('cols').push(
        Col.create({
          subpath: el.name,
          parent: this,
          name: el.name,
          table: el.table,
          type: el.type
        })
      )
      this.generateSQL();
    });
  console.log(this.get('cols.0.dynamicDependencyProp'));
  }.on('init'),

  generateSQL: function() {
    console.log("generates");
    let cols = this.get('cols');
    cols.forEach((col)=> {
      this.sortColumnByType(col);
    });
  }.observes('cols.@each.dynamicDependencyProp'),

  sortColumnByType(el) {
    this.set('squel', new squel.select());
    switch(el.get('type')) {
      case "boolean":
        this.get('squel').where(el.get('name') + " = " + this.get('parent.' + el.get('name')));
        break;
      case "range":
        let propertyValue = this.get('parent.' + el.get('name'));
        let parsedRangeArray = this.parsedRangeArray(propertyValue);
        this.get('squel').where(el.get('name') + " BETWEEN " + parsedRangeArray[0] + " AND " + parsedRangeArray[1]);
        break;
      default:
        this.get('squel').where(el.get('name') + " = " + this.get('parent.' + el.get('name')));
    }
  },

  parsedRangeArray: function(string) {
    return JSON.parse(string);
  },
  testObserver: function() {
    console.log("observes changes in child objects")
  }.observes('cols.@each.col.name'),
  sql: function() {
    return this.get('squel').toString();
  }.property('cols.@each.name')
});
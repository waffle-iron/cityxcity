import Ember from 'ember';
import Generator from '../custom/generator';
import squel from 'npm:squel';
import groupby from 'npm:lodash.groupby';

export default Ember.Mixin.create({
  tables: [],
  init: function() {
    this._super();
    let filters = this.get('cartodbMapFilters');
    let grouped = groupby(filters, 'table');

    for (var property in grouped) {
      if (grouped.hasOwnProperty(property)) { 
        this.buildTableObject(grouped, property);
      }
    }
  },
  buildTableObject(grouped, property) {
    let queryParams = this.get('queryParams');
    let generator;
    this.get('tables').push(
      generator = Generator.create({
        name: property,
        filters: grouped[property],
        queryParams,
        context: this
      })
    )
  }
});

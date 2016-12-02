import Ember from 'ember';
import Table from '../custom/table';
import squel from 'npm:squel';
import groupby from 'npm:lodash.groupby';

export default Ember.Mixin.create({
  tables: [],
  createTables: function() {
    let filters = this.get('cartodbMapFilters');
    let grouped = groupby(filters, 'table');

    for (var property in grouped) {
      if (grouped.hasOwnProperty(property)) { 
        this.get('tables').push(
          Table.create({
            parent: this,
            filters: grouped[property],
            name: property
          })
        )
      }
    }
  }.on('init')
});

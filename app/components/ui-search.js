import Ember from 'ember';
import UISearch from 'semantic-ui-ember/components/ui-search';

export default UISearch.extend({
  // refreshSource: Ember.observer('source', function() {
  //   console.log('rerender')
  //   this.set('source', this.get('source'));
  //   this.rerender();
  // })
  classNames: 'ui search',
  didInsertElement() {
    this.updateSource();
  },
  updateSource: Ember.observer('source', function() {
    Ember.run.schedule('afterRender', this, () => {
      var that = this;
      console.log('inserting');
      $('.ui.search')
        .search({
          source : this.get('source'),
          onSelect: function() {
            that.get('onSearchQuery')()
          } 
        });
    });
  })
});

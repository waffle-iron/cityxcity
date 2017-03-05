import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['ui-visibility-sticky'],
  currentCity: Ember.inject.service(),
  didInsertElement() {
    Ember.run.next(this, function() {
      this.$()
        .visibility({
          type   : 'fixed',
          offset : 15,
          context: '#sidebar',
          offset: 64
        })
      ;
    })
  }
});

import Ember from 'ember';

export default Ember.Component.extend({
  progress: 0,
  message: 'Uploading',
  barStyle: Ember.computed('progress', function() {
    let progress = this.get('progress');
    return Ember.String.htmlSafe(`transition-duration: 300ms; width: ${progress}%;`);
  })
});

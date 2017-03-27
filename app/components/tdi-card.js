import Ember from 'ember';

export default Ember.Component.extend({
  route: '',
  modelContext: null,
  height: 300,
  style: Ember.computed(function() {
    let { height, image } = this.getProperties('height', 'image');
    return Ember.String.htmlSafe(`min-height: ${height}px; background-image: url('${image}'); background-size: cover;`);
  })
});

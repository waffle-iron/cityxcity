import Ember from 'ember';
import squel from 'npm:squel';

export default Ember.Object.extend({
  col: function() {
    console.log("triggered");
    return Ember.Object.extend({
      name: Ember.computed.alias(`parent.${this.get("name")}`)
    }).create({parent: this.get("parent.parent")});
  }.property('parent.parent', 'name'),
  test: function() {
    setTimeout(() => {
      console.log(this.get('col.name'));
    }, 1000);
  }.on('init'),
  dynamicDependencyProp: Ember.computed.alias("col.name")
});
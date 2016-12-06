import Ember from 'ember';
import squel from 'npm:squel';

export default Ember.Object.extend({
  init() {
    let prop = this.get('name');
    this.addObserver(`parent.parent.${prop}`, () => {
      console.log('property changes');
      console.log(this.get(`parent.parent.${prop}`));
      this.get('parent').generateSQL();
    });
  }
});

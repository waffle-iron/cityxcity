import Ember from 'ember';

export default Ember.Mixin.create({
  currentCity: Ember.inject.service(),
  positionMap() {
    let currentCity = this.get('currentCity');
    let model = this.modelFor(this.routeName);
    model.set('isSelected', true);
    currentCity.set('latitude', model.get('latitude'));
    currentCity.set('longitude', model.get('longitude'));
    currentCity.set('zoom', 17);
  },
  actions: {
    didTransition() { 
      this.positionMap();
      return this._super();
    },
    willTransition() {
      let model = this.modelFor(this.routeName);
      model.set('isSelected', false);
      return this._super();
    }
  }
});

import Ember from 'ember';

export default Ember.Mixin.create({
  currentCity: Ember.inject.service(),
  positionMap() {
    let currentCity = this.get('currentCity');
    let model = this.modelFor(this.routeName);
    let latitude = model.get('latitude');
    let longitude = model.get('longitude');
    let zoom = 25;

    model.set('isSelected', true);

    currentCity.setProperties({
      latitude,
      longitude,
      zoom
    });
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

import Ember from 'ember';
import CenterMapOnGeometry from '../../../mixins/center-map-on-geometry';

export default Ember.Route.extend(CenterMapOnGeometry, {
  actions: {
    didTransition() {
      let currentCity = this.get('currentCity');
      currentCity.set('isPlottingPoint', true);
    },
    willTransition(transition) {
      let currentCity = this.get('currentCity');
      currentCity.set('isPlottingPoint', false)
    }
  }
});

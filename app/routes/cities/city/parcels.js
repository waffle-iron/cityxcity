import Ember from 'ember';
import CenterMapOnGeometry from '../../../mixins/center-map-on-geometry';

export default Ember.Route.extend(CenterMapOnGeometry, {
  // model(params) {
  //   console.log(params);
  //   return this.store.findRecord('parcel', params.parcel_id);
  // }
});

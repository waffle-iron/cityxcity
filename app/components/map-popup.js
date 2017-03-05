import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['ui', 'segment', 'map-popup'],
  classNameBindings: ['hidden'],
  attributeBindings: ['style'],
  style: Ember.computed('left','right', function() {
    let left = this.get('left');
    let top = this.get('top');
    return Ember.String.htmlSafe(`left: ${left}px; top: ${top}px`);
  }),
  hidden: true,
  currentCity: Ember.inject.service(),
  actions: {
    onMouseover(event) {
      this.set('hidden', false);
      let mapInstance = this.get('currentCity.mapInstance');
      let clientClick = mapInstance.latLngToContainerPoint(event.target.getLatLng());
      this.set('top', clientClick.y);
      this.set('left', clientClick.x)
      window.point = event;
    },
    onMouseout(event) {
      this.set('hidden', true);
    }
  }
});

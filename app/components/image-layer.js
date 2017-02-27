import Ember from 'ember';
import ImageLayer from 'ember-leaflet/components/image-layer';

export default ImageLayer.extend({
  didCreateLayer() {
    Ember.run.next(this,() => {
      $(this._layer.getElement()).css('z-index', 999)
    });
  }
});

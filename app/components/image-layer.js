import Ember from 'ember';
import ImageLayer from 'ember-leaflet/components/image-layer';

export default ImageLayer.extend({
  leafletProperties: [
    'url', 'opacity', 'pane'
  ]
});

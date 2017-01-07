import Ember from 'ember';

export default Ember.Component.extend({
  city: null,
  assetType: null,

  visibleFeatures: Ember.computed('city.features.[]', 'assetType', {
    get() {
      let features = this.get('city.features');
      let assetType = this.get('assetType');

      return features.filter((feature) => {
        return feature.get('assetType') === assetType;
      })
    }
  })
});

import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent('leaflet-map', 'Integration | Component | leaflet map',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#leaflet-map}}
      //     template content
      //   {{/leaflet-map}}
      // `);

      this.render(hbs`{{leaflet-map}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);

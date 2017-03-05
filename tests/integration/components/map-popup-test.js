import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent('map-popup', 'Integration | Component | map popup',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#map-popup}}
      //     template content
      //   {{/map-popup}}
      // `);

      this.render(hbs`{{map-popup}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);

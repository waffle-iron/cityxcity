import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent('popup-layer', 'Integration | Component | popup layer',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#popup-layer}}
      //     template content
      //   {{/popup-layer}}
      // `);

      this.render(hbs`{{popup-layer}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);

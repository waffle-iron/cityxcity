import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent('edit-feature', 'Integration | Component | edit feature',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#edit-feature}}
      //     template content
      //   {{/edit-feature}}
      // `);

      this.render(hbs`{{edit-feature}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);

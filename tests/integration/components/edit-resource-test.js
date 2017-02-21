import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent('edit-resource', 'Integration | Component | edit resource',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#edit-resource}}
      //     template content
      //   {{/edit-resource}}
      // `);

      this.render(hbs`{{edit-resource}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);

import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent('ui-visibility-sticky', 'Integration | Component | ui visibility sticky',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#ui-visibility-sticky}}
      //     template content
      //   {{/ui-visibility-sticky}}
      // `);

      this.render(hbs`{{ui-visibility-sticky}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);

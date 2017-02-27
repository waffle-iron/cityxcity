import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent('ui-search', 'Integration | Component | ui search',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#ui-search}}
      //     template content
      //   {{/ui-search}}
      // `);

      this.render(hbs`{{ui-search}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);

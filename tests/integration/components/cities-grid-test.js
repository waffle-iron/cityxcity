import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent('cities-grid', 'Integration | Component | cities grid',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#cities-grid}}
      //     template content
      //   {{/cities-grid}}
      // `);

      this.render(hbs`{{cities-grid}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);

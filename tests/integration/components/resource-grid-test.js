import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent('resource-grid', 'Integration | Component | resource grid',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#resource-grid}}
      //     template content
      //   {{/resource-grid}}
      // `);

      this.render(hbs`{{resource-grid}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);

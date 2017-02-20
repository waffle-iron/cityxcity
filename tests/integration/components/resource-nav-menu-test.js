import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent('resource-nav-menu', 'Integration | Component | resource nav menu',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#resource-nav-menu}}
      //     template content
      //   {{/resource-nav-menu}}
      // `);

      this.render(hbs`{{resource-nav-menu}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);

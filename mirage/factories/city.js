import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name(i) { return `City ${i}`; },
  fellows: true,
  avatar() { return faker.internet.avatar(); }
});

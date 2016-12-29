import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name() { return faker.address.city(); },
  fellows() { return faker.random.boolean(); },
  avatar() { return faker.internet.avatar(); },
  splash() {
    return `http://lorempixel.com/500/300/city?cachebust=${Math.random()}`
  }
});

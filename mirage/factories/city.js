import { Factory, faker } from 'ember-cli-mirage';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export default Factory.extend({
  name() { return faker.address.city(); },
  fellows() { return faker.random.boolean(); },
  avatar() { return faker.internet.avatar(); },
  splash() {
    return `http://lorempixel.com/500/300/city/${getRandomInt(1,10)}`;
  },
  latitude() { return faker.address.latitude(); },
  longitude() { return faker.address.longitude(); }
});

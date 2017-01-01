import { Factory, faker } from 'ember-cli-mirage';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export default Factory.extend({
  name() { return faker.address.city() },
  fellows: faker.random.boolean,
  avatar: faker.internet.avatar,
  splash: `http://lorempixel.com/500/300/city/${getRandomInt(1,10)}`,
  latitude: faker.address.latitude,
  longitude: faker.address.longitude,
  afterCreate(city, server) {
    for (var i = 0; i <= 1; i++) {
      server.create('feature', { city });  
      // server.create('investment', { city });
      server.create('parcel', { city });  
    }
  }
});

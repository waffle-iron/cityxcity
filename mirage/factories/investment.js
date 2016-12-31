import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name() { return faker.company.companyName(); },

  address: faker.address.streetAddress,
  contact: faker.internet.email,
  employer: faker.random.boolean,
  activating: faker.random.boolean,
  latitude: faker.address.latitude,
  longitude: faker.address.longitude
});

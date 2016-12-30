import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name() { return faker.company.companyName(); },

  address() { return faker.address.streetAddress(); },
  contact() { return faker.internet.email(); },
  employer() { return faker.random.boolean(); },
  activating() { return faker.random.boolean(); },
  latitude() { return faker.address.latitude(); },
  longitude() { return faker.address.longitude(); }
});

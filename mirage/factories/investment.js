import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name() { return faker.company.companyName(); },

  address: faker.address.streetAddress,
  contact: faker.internet.email,
  employer: faker.random.boolean,
  activating: faker.random.boolean,
  type(i) {
    return faker.list.cycle('MassDev Direct',
                            'State Direct (non-MassDev)',
                            'Other Public Agency',
                            'Private',
                            'Public-Private')(i);
  },
  value: faker.finance.amount,
  latitude: faker.address.latitude,
  longitude: faker.address.longitude
});

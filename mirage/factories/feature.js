import { Factory, faker } from 'ember-cli-mirage';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export default Factory.extend({
  name() { return faker.company.companyName() },
  address: faker.address.streetAddress,
  contact: faker.internet.email,
  employer: faker.random.boolean,
  activating: faker.random.boolean,
  splash() {
    return `http://lorempixel.com/500/300/city/${getRandomInt(1,10)}`;
  },
  assetType(i) { return faker.list.cycle( "Food",
                                          "Business",
                                          "Retail",
                                          "Community",
                                          "Cultural & Entertainment",
                                          "Health Care",
                                          "Education",
                                          "Government ",
                                          "Temporary",
                                          "Park / Open Space",
                                          "Parking",
                                          "Public Transit")(i); },
  subtype(i) { return faker.list.cycle("Clothing", "Convenience ", "Pharmacy", "Household Goods", "Other Retail")(i) },
  comment: faker.lorem.text,
  opendate: faker.date.past,
  closedate: faker.date.recent,
  latitude: faker.address.latitude,
  longitude: faker.address.longitude
});
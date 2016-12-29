import { Factory, faker, association } from 'ember-cli-mirage';

export default Factory.extend({
  name() { return faker.company.companyName(); },
  address() { return faker.address.streetAddress(); },
  contact() { return faker.internet.email(); },
  employer() { return faker.random.boolean(); },
  activating() { return faker.random.boolean(); },
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
  comment() { return faker.lorem.text(); },
  opendate() { return faker.date.past(); },
  closedate() { return faker.date.recent(); },
  city: association()
});

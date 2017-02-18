export default function(server) {
  // server.createList('city', 9);
  server.loadFixtures('cities');
  server.loadFixtures('investments');
  server.loadFixtures('features');
  server.loadFixtures('parcels');
  // server.createList('investment', 9);
  server.createList('user', 1);
  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.

    Make sure to define a factory for each model you want to create.
  */

  // server.createList('post', 10);
}

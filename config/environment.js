/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'cityxcity',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      filters: [
                {  name: "investment_type_code", 
                  type: "list", 
                  table: "investments",
                  alias: "investmentType" },
               {  name: "value", 
                  type: "range", 
                  table: "investments",
                  alias: "value" },

               {  name: "bld_area", 
                  type: "range", 
                  table: "parcels",
                  alias: "bld_area" },
               {  name: "tdi_land_use", 
                  type: "type", 
                  table: "parcels",
                  alias: "tdi_land_use" },
               {  name: "tdi_for_sale", 
                  type: "boolean", 
                  table: "parcels",
                  alias: "tdi_for_sale" },
               {  name: "tdi_for_lease", 
                  type: "boolean", 
                  table: "parcels",
                  alias: "tdi_for_lease" },
               {  name: "year_built", 
                  type: "range", 
                  table: "parcels",
                  alias: "year_built" },

               {  name: "activating", 
                  type: "boolean", 
                  table: "features",
                  alias: "featureActivating" },
               {  name: "type_code", 
                  type: "list", 
                  alias: "featureType",
                  table: "features" },
               {  name: "employer", 
                  type: "boolean", 
                  alias: "employer",
                  table: "features" }
                  ],
      domains: {
        featureType: {
          name: "featureType",
          domain: {
            codedValues: [
              {
                name: "Business",
                code: 1
              },
              {
                name: "Public Transit",
                code: 2
              },
              {
                name: "Park / Open Space",
                code: 3
              },
              {
                name: "Community",
                code: 4
              },
              {
                name: "Government ",
                code: 5
              },
              {
                name: "Health Care",
                code: 6
              },
              {
                name: "Parking",
                code: 7
              },
              {
                name: "Cultural / Entertainment",
                code: 8
              },
              {
                name: "Temporary",
                code: 9
              },
              {
                name: "Food",
                code: 10
              },
              {
                name: "Retail",
                code: 11
              },
              {
                name: "Government",
                code: 12
              },
              {
                name: "Education",
                code: 13
              },
              {
                name: "Residential",
                code: 14
              }
            ]
          },
          editable: true,
          nullable: false
        },
        investmentType: {
          name: "featureType",
          domain: {
            codedValues: [
                    {
                    name: "equity",
                    code: 1
                    },
                    {
                    name: "private",
                    code: 2
                    },
                    {
                    name: "public",
                    code: 3
                    } ],
            }
          }
      }
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV['ember-cli-mirage'] = {
    //   enabled: false
    // }
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.locationType = 'hash';
    ENV.baseUrl = '/cityxcity/';
    ENV['ember-cli-mirage'] = {
      enabled: true
    }
    ENV.prepend = 'https://mapc.github.io/cityxcity/';

  }

  return ENV;
};

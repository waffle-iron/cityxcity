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
      filters: [{  name: "type", 
                  type: "type", 
                  table: "investments",
                  alias: "type" },
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

               {  name: "type", 
                  type: "type", 
                  alias: "featureType",
                  table: "features" },

               {  name: "employer", 
                  type: "boolean", 
                  alias: "employer",
                  table: "features" }
                  ]
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
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

  }

  return ENV;
};

import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

const RELATED_FEATURES_CHECKBOX = '.filters .features-checkbox .checkbox';
const RELATED_INVESTMENTS_CHECKBOX = '.filters .investments-checkbox .checkbox';
// const RELATED_PARCELS_CHECKBOX = '.filters .parcels-checkbox';
const FEATURES_CARDS = '.city-details .feature-card';
const INVESTMENTS_CARDS = '.city-details .investment-card';
const FEATURE_TYPE_FILTER = '.feature-types .checkbox';
const BOOLEAN_FILTER = '.other-categories .checkbox';

const INVESTMENT_TYPE_FILTER = '.investments-types .checkbox';

// const PARCELS_TYPES_FILTER = '.investment-types .checkbox';
// const PARCELS_BOOLEAN_FILTER = '.parcels-categories .checkbox';

describe('Acceptance | user can filter features assets and parcels', function() {
  let application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  describe('with features selected', function() {
    beforeEach(function() {
      server.createList('city', 1);
      visit('/cities/1/details');
      click(RELATED_FEATURES_CHECKBOX);
    });
    // server.createList('city', 2);
    it('shows all available unfiltered features', function() {

      let features = find(FEATURES_CARDS);
      expect(features).to.have.length(11);
    });

    describe('uses types filter', function() {
      beforeEach(function() {
        click(FEATURE_TYPE_FILTER);

      });

      it('shows filtered features', function() {
        let features = find(FEATURES_CARDS);

        expect(features).to.have.length(1);
      });
    });

    describe('uses boolean filter', function() {
      beforeEach(function() {
        click(BOOLEAN_FILTER);
      });

      it('shows filtered features', function() {
        let features = find(FEATURES_CARDS);

        // the unit tests might be the ones to test for record-level
        // filtering accuracy
        expect(features.length).to.be.below(11);
      });
    });

  });

  describe('with assets selected', function() {
    beforeEach(function() {
      server.createList('city', 1);
      visit('/cities/1/details');
      click(RELATED_INVESTMENTS_CHECKBOX);
    });
    // server.createList('city', 2);
    it('shows all available unfiltered investments', function() {
      let investments = find(INVESTMENTS_CARDS);

      expect(investments).to.have.length(11);
    });

    describe('uses types filter', function() {
      beforeEach(function() {
        click(INVESTMENT_TYPE_FILTER);
      });

      it('shows filtered investments', function() {
        let investments = find(INVESTMENTS_CARDS);

        expect(investments).to.have.length(3);
      });
    });
  });

  describe('with parcels selected', function() {
    // server.createList('city', 2);
    it('shows all available unfiltered features');
  });
});

import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

// selectors
const CITIES = '.city.menu';
const CITIES_LINK = '.cities-link';

describe('Acceptance | user views list of cities', function() {
  let application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  describe('with cities', function() {
    beforeEach(function() {
      server.createList('city', 2);
      visit('/');
    });

    it('shows two cities', function() {
      let cities = find(CITIES);
      // return pauseTest();
      expect(cities).to.have.length(2);
    });

    describe('click cities link', function() {
      beforeEach(function() {
        click(CITIES_LINK);
      });

      it("doesn't show cities", function() {
        expect(currentURL()).to.equal('/cities');
      });

      it("shows a map");
      it("show a sidebar");
    });
  });

  describe('without cities', function() {
    beforeEach(function() {
      visit('/');
    });

    it("doesn't show cities", function() {
      let cities = find(CITIES);

      expect(cities).to.have.length(0);
    });
  });


});
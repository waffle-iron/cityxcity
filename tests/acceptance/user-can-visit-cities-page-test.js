import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

// selectors
const CITIES = '.ui.menu a.item';
const CITIES_LINK = '.cities-link';

describe('Acceptance | user can visit cities page', function() {
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

      // return 
      expect(cities).to.have.length(2);
    });

    describe('click cities link', function() {
      beforeEach(function() {
        // pauseTest();
        click(CITIES_LINK);
      });

      it("doesn't show cities", function() {
        expect(currentURL()).to.equal('/cities');
      });

      it("shows a map", function() {
        expect(find('.leaflet-container').height()).to.be.above(0);
        expect(find('.leaflet-container').width()).to.be.above(0);
      });
      it("show a sidebar", function() {
        expect(find('.cities-sidebar')).to.be.ok;
      });
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
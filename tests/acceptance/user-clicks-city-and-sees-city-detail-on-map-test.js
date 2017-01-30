import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

const CITY_LINK = '.ui.menu a.item';
const CITY_DETAIL_NAME = '.cities-sidebar h1';
const CITY_MARKER = '.leaflet-marker-icon';

describe('Acceptance | user clicks city and sees city detail on map', function() {
  let application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  describe('with cities', function() {
    // let city;
    // let second_city;
    beforeEach(function() {
      server.create('city', { name: 'Worcester' });
      // second_city = server.create('city', { name: 'Springfield' });
      visit('/');
    });

    describe('click a city', function() {
      beforeEach(function() {
        click(CITY_LINK);
      });

      it('shows city detail', function() {
        // let city_name = city.name;
        expect(find(CITY_DETAIL_NAME).text()).to.equal('Worcester');
      });

      it('shows city marker', function() {
        expect(find(CITY_MARKER)).to.be.ok;
      });

      // describe('clicks another marker and transitions route', function() {
      //   let second_marker = $(CITY_MARKER)[1];
      //   click(second_marker);

      //   it('transitions route', function() {
      //     expect(currentURL()).to.be('/cities/2');
      //   });

      //   it('recenters map', function() {
      //     let controller = application.getController("cities");
      //     let latitude = controller.get('latitude');

      //     expect(latitude).to.equal(second_city.latitude);

      //   });
      // });
    });
  });
});

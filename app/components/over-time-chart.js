import Ember from 'ember';

export default Ember.Component.extend({
  dates: null,
  selection: '2016-01-01',

  data: Ember.computed('dates', function() {
    let that = this;
    return {
      x: 'x',
      type: 'spline',
      json: this.get('dates'),
      keys: { 
          x: 'key',
          value: ['feature', 'investment']
      }
    }
  }),

  axis: {
    x: {
      type: 'timeseries',
      tick: {
        format: '%Y-%m'
      }
    },
    y: {
      show: false
    }
  },

  chartColors: {
    pattern: ['#5CA2D1','#A53ED5']
  },

  size: {
    height: 120
  },
  
  selectPoint: function(d) {
    this.set('selection', d.x);
  },

  onrendered: Ember.computed(function(c3) {
    var that = this;
    return function() {
      d3.selectAll('.c3-event-rect')
        .on('click', (d) => {
          that.set('selection', d.x);
        });
    }
  })
});

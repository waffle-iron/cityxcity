import Ember from 'ember';
const MONTHS = ['01','02','03','04','05','06','07','08','09','10','11','12'];

export default Ember.Component.extend({
  setupSnapshots: function() {
    let snapshots = this.get('snapshots');
    console.log(snapshots);
    if(!snapshots) {
      this.set('snapshots', Em.A([]));
    }
  }.on('init'),
  months: MONTHS,
  month: '01',
  year: 2016,
  status: null,
  snapshots: [],
  orderedSnapshots: Ember.computed('snapshots.[]', function() {
    let snapshots = this.get('snapshots');
    if(!Ember.isEmpty(snapshots)) {
      return snapshots.sortBy((el) => { return el.date; });  
    } else {
      return snapshots;
    }
  }),
  actions: {
    addNew() {
      let { snapshots, month, year, choice } = this.getProperties('snapshots', 'month', 'year', 'choices.firstObject');
      if(snapshots) {
        snapshots.pushObject({ date: `${year}-${month}`, status: choice });  
      } else {
        snapshots.pushObject({ date: `${year}-${month}`, status: choice });
      }
    }
  }
});

export default function isLongitudinalFilter(selectedDate, longitudinalField, model) {
  // selectedDate, longitudinalField, model
  let truthState = 'open';
  let fieldDates = model.get(longitudinalField);
  let sortedDates = fieldDates.sortBy(function(o){ return new Date( o.quarter ) });
  let state = false;
  sortedDates.forEach((el, index) => {
    let futureDate = sortedDates[index + 1];
    if (!futureDate) return;
    if ((truthState == el.status) && (new Date(selectedDate) < sortedDates[index + 1].quarter)) {
      state = true;
    }
  });
  return state;
}

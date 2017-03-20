export default function isLongitudinalFilter(selectedDate, longitudinalField, model) {
  // selectedDate, longitudinalField, model
  let truthState = 'open';
  let fieldDates = model.get(longitudinalField);
  let sortedDates = fieldDates.sortBy(function(o){ return new Date( o.quarter ) });
  let state = false;

  // is selected date within the range? 
  if ((new Date(selectedDate) > sortedDates[0].quarter) && (new Date(selectedDate) < sortedDates[sortedDates.length-1].quarter) ) {

    // what is the status of the selectedDate?
    sortedDates.forEach((el, index) => {
      let futureDate = sortedDates[index + 1];
      if (!futureDate) return;
      if ((truthState == el.status) && (new Date(selectedDate) < sortedDates[index + 1].quarter)) {
        state = true;
      }
      // console.log(model.id, ": ", el.quarter, el.status, state);  
    });
  }
  return state;
}

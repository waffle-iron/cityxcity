export default function isLongitudinalFilter(selectedDate, longitudinalField, model) {
  if(!selectedDate) return true;

  // selectedDate, longitudinalField, model
  let truthState = 'open';
  let fieldDates = model.get(longitudinalField);
  let sortedDates = fieldDates.sortBy(function(o){ return new Date( o.quarter ) });
  let state = false;
  let min = sortedDates[0].quarter;
  let max = sortedDates[sortedDates.length - 1].quarter;

  // what is the status of the selectedDate?
  sortedDates.forEach((el, index) => {
    let subsequentDate = sortedDates[index + 1];

    // is there a subsequent date or is this the last?
    if (subsequentDate) {
      let parsedSubsequentDate = new Date(selectedDate);
      
      // is the selected date greater than the current element date and less than the subsequent element date? 
      if ( (new Date(selectedDate) > el.quarter) && (new Date(selectedDate) < new Date(subsequentDate.quarter)) ) {
        if (el.status == truthState) {
          state = true;
        }
      }
    } else {
      // it's the last in the array anyway, check its truth state
      if (el.status == truthState) {
        state = true;
      }
    }
  });

  return state;
}

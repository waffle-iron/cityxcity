export default function monthsBetween(dateStart, dateEnd, format) {
  let timeValues = [];
  if (!format) format = 'YYYY-MM'
  dateStart = moment(dateStart);
  dateEnd = moment(dateEnd);
  
  while (dateEnd > dateStart) {
     timeValues.push({ date: dateStart.toDate(), alias: dateStart.format(format) });
     dateStart.add(1,'month');
  }
  return timeValues;
}

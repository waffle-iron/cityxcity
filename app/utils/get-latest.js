export default function getLatest(prop, context) {
  let property = context.get(prop);
  if (property) {
    property = JSON.parse(property);  
    return property.sortBy((el) => { return moment(el.date) } )[property.length - 1].status;
  } else {
    return [];
  } 
}

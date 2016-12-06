import squel from 'npm:squel';

export default function cartodbSql(filters, context, table) {
  let query = squel.select();
  let queryTable = table || filters[0]['table'];
  query.from(queryTable);

  filters.forEach((el) => {
    let column = `${table}.${el['name']}`
    let value = context.get(el['alias']);
    if(value) {
      switch(el['type']) {
        case "boolean":
          query.where(column + " = " + value);
          break;
        case "range":
          let propertyValue = value;
          let parsedRangeArray = JSON.parse(propertyValue);
          query.where(column + " BETWEEN " + parsedRangeArray[0] + " AND " + parsedRangeArray[1]);
          break;
        default:
          query.where(column + " = '" + value + "'");
      }
    }
  });

  return query.toString();
}


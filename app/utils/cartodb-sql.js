import squel from 'npm:squel';

export default function cartodbSql(context, filters, table) {
  let query = squel.select();
  let queryTable = table;
  query.from(queryTable);

  filters.forEach((el) => {
    let column = `${table}.${el['name']}`
    let value = context.get(el['alias']);
    if(!!value && (el['table'] == queryTable)) {
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


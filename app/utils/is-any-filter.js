export default function isAnyFilter(typesArray, field, model) {
  if(typesArray.length <= 1) return true;
  return typesArray.isAny('', model.get(field));
}

export default function isAnyFilter(typesArray, field, model) {
  if(typeof typesArray==='undefined') throw new Error("is-any-filter: nothing to compare");
  if(typesArray.length <= 1) return true;
  return typesArray.isAny('', model.get(field));
}

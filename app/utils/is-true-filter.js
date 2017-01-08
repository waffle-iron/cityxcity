export default function isTrueFilter(filter, field, model) {
  if(!filter) return true;
  return model.get(field) === filter;
}

export default function isWithinFilter(min, max, field, model) {
  if(!(min && max)) return true;
  let value = model.get(field);
  return (value >= min) && (value <= max);
}

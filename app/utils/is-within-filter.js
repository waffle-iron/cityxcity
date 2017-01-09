export default function isWithinFilter(minMaxArray, field, model) {
  let [ min, max ] = minMaxArray;
  if(!(min && max)) return true;
  let value = model.get(field);
  return (value >= min) && (value <= max);
}

export default function arrayify(propertyString, delimiter) {
  return {
    get() {
      if (!this.get(propertyString)) return [];
      return this.get(propertyString).split(delimiter);
    }
  }
}

import isAnyFilter from '../utils/is-any-filter';
import isTrueFilter from '../utils/is-true-filter';
import isWithinFilter from '../utils/is-within-filter';

export default function applyFilterTo(enumerable, config) {
  return {
    get() {
      // debugger;
      let models = this.get(enumerable);

      config.forEach((propertyConfig) => {
        let filter = this.get(propertyConfig.filter);
        let property = propertyConfig.property;

        models = models.filter(
          (findFilterFunction(propertyConfig.filterType))
          .bind(this, filter, property)
        );
      });

      return models;
    }
  }
}

function findFilterFunction(filterType) {
  switch(filterType) {
    case 'isAny':
      return isAnyFilter
    case 'isTrue':
      return isTrueFilter
    case 'isWithin':
      return isWithinFilter
  }
}
import isAnyFilter from '../utils/is-any-filter';
import isTrueFilter from '../utils/is-true-filter';
import isWithinFilter from '../utils/is-within-filter';

export default function applyFilterTo(enumerable, config) {
  return {
    get() { return getFilter(this, enumerable, config) }
  };
}

export function getFilter(context, enumerable, config) {
  let models = context.get(enumerable);

      config.forEach((propertyConfig) => {
        let filter;
        let filterType = propertyConfig.filterType;


        if(filterType == "isWithin") {
          let [ min, max ] = propertyConfig.filter;
          filter = [context.get(min), context.get(max)];
        } else {
          filter = context.get(propertyConfig.filter);
        }

        let property = propertyConfig.property;
        
        models = models.filter(
          (findFilterFunction(filterType))
          .bind(context, filter, property)
        );
      });

      return models;
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
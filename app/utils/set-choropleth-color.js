export default function setChoroplethColor(feature, choroplethLayer, CONFIG) {
  let color;
  CONFIG.forEach((config) => {
    if(config.setName == choroplethLayer) {
      if(config.default_color) { color = config.default_color; }
      config.colorMap.forEach((mapping) => {
        if (mapping.value == feature.properties[mapping.key]) {
          color = mapping.color;
        }
      });
    }
  });
  return color;
}

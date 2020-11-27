const updateMapEvents = (events = []) => ({
  type: 'UPDATE_MAP_EVENTS',
  payload: { events },
});
const updateMapBounds = (bounds = []) => ({
  type: 'UPDATE_MAP_BOUNDS',
  payload: { bounds },
});
const updateMapBoundsFromEvents = (events = []) => {
  const bounds = [];
  if (events.length)
    events.forEach((event) => {
      if (event.geometry) {
        event.geometry.forEach((geo) => {
          if (geo.coordinates) {
            let neogeo;
            switch (geo.type.toLowerCase()) {
              case 'polygon':
                neogeo = geo.coordinates[0].map((ln) => [...ln].reverse());
                break;
              case 'point':
                neogeo = [...geo.coordinates].reverse();
                break;
              default:
            }
            bounds.push(neogeo);
          }
        });
      }
    });
  return {
    type: 'UPDATE_MAP_BOUNDS',
    payload: { bounds },
  };
};
export default { updateMapEvents, updateMapBounds, updateMapBoundsFromEvents };

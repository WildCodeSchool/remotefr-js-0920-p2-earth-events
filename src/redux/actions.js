const updateMapEvents = (events = []) => ({
  type: 'UPDATE_MAP_EVENTS',
  payload: { events },
});
const updateMapBounds = (events = []) => ({
  type: 'UPDATE_MAP_BOUNDS',
  payload: { events },
});
export default { updateMapEvents, updateMapBounds };

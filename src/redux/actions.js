const updateMapEvents = (events = []) => ({
  type: 'UPDATE_MAP_EVENTS',
  payload: { events },
});
export default { updateMapEvents };

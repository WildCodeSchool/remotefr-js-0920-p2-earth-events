import { combineReducers } from 'redux';

const mapEvents = (state = {}, action) => {
  const bounds = [];
  switch (action.type) {
    case 'UPDATE_MAP_EVENTS':
      return {
        ...state,
        currentView: action.payload.events,
      };
    case 'UPDATE_MAP_BOUNDS':
      if (action.payload.events)
        action.payload.events.forEach((event) => {
          if (event.geometry)
            event.geometry.forEach((geo) =>
              bounds.push([...geo.coordinates].reverse()),
            );
        });
      return {
        ...state,
        bounds,
      };
    default:
      return state;
  }
};

export default combineReducers({ mapEvents });

import { combineReducers } from 'redux';

const mapEvents = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_MAP_EVENTS':
      return {
        ...state,
        currentView: action.payload.events,
      };
    case 'UPDATE_MAP_BOUNDS':
      return {
        ...state,
        bounds: action.payload.bounds,
      };
    default:
      return state;
  }
};

export default combineReducers({ mapEvents });

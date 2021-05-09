import { combineReducers } from "redux";
import dateFns from "date-fns";

import {
  ADD_EVENT,
  EDIT_EVENT,
  REMOVE_EVENT,
  SET_EVENT_MODAL_COLOR,
  SET_EVENT_MODAL_DAY,
  SET_EVENT_MODAL_ID,
  SET_EVENT_MODAL_TITLE,
  SET_NEXT_MONTH,
  SET_PREV_MONTH,
  SET_CURRENT_MONTH,
  TOGGLE_EVENT_MODAL,
  SET_NEXT_YEAR,
  SET_PREV_YEAR,
} from "./actions";

const eventModalReducer = (
  state = {
    color: "red",
    day: new Date(),
    id: null,
    open: false,
    title: "",
  },
  action
) => {
  switch (action.type) {
    case SET_EVENT_MODAL_COLOR:
      return {
        ...state,
        color: action.payload,
      };
    case SET_EVENT_MODAL_DAY:
      return {
        ...state,
        day: action.payload,
      };
    case SET_EVENT_MODAL_ID:
      return {
        ...state,
        id: action.payload,
      };
    case SET_EVENT_MODAL_TITLE:
      return {
        ...state,
        title: action.payload,
      };
    case TOGGLE_EVENT_MODAL:
      return {
        ...state,
        open: action.payload,
      };
    default:
      return state;
  }
};

const eventsReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_EVENT:
      return [...state, action.payload];
    case EDIT_EVENT:
      return state.map((event) =>
        event.id === action.payload.id ? action.payload : event
      );
    case REMOVE_EVENT:
      return state.filter((event) => event.id !== action.payload);
    default:
      return state;
  }
};

const monthsReducer = (
  state = {
    currentMonth: new Date(),
  },
  action
) => {
  switch (action.type) {
    case SET_CURRENT_MONTH:
      return {
        currentMonth: new Date(),
      };
    case SET_NEXT_MONTH:
      return {
        currentMonth: dateFns.addMonths(state.currentMonth, 1),
      };
    case SET_PREV_MONTH:
      return {
        currentMonth: dateFns.subMonths(state.currentMonth, 1),
      };
    case SET_NEXT_YEAR:
      return {
        currentMonth: dateFns.addMonths(state.currentMonth, 12),
      };
    case SET_PREV_YEAR:
      return {
        currentMonth: dateFns.subMonths(state.currentMonth, 12),
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  eventModal: eventModalReducer,
  events: eventsReducer,
  months: monthsReducer,
});

export default rootReducer;

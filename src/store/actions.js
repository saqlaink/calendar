export const ADD_EVENT = "ADD_EVENT";
export const EDIT_EVENT = "EDIT_EVENT";
export const REMOVE_EVENT = "REMOVE_EVENT";
export const SET_EVENT_MODAL_COLOR = "SET_EVENT_MODAL_COLOR";
export const SET_EVENT_MODAL_DAY = "SET_EVENT_MODAL_DAY";
export const SET_EVENT_MODAL_ID = "SET_EVENT_MODAL_ID";
export const SET_EVENT_MODAL_TITLE = "SET_EVENT_MODAL_TITLE";
export const SET_NEXT_MONTH = "SET_NEXT_MONTH";
export const SET_PREV_MONTH = "SET_PREV_MONTH";
export const SET_NEXT_YEAR = "SET_NEXT_YEAR";
export const SET_PREV_YEAR = "SET_PREV_YEAR";
export const SET_CURRENT_MONTH = "SET_CURRENT_MONTH";
export const TOGGLE_EVENT_MODAL = "TOGGLE_EVENT_MODAL";

export const addEvent = ({ payload }) => ({
  type: ADD_EVENT,
  payload,
});

export const editEvent = ({ payload }) => ({
  type: EDIT_EVENT,
  payload,
});

export const removeEvent = ({ payload }) => ({
  type: REMOVE_EVENT,
  payload,
});

export const setEventModalColor = ({ payload }) => ({
  type: SET_EVENT_MODAL_COLOR,
  payload,
});

export const setEventModalDay = ({ payload }) => ({
  type: SET_EVENT_MODAL_DAY,
  payload,
});

export const setEventModalId = ({ payload }) => ({
  type: SET_EVENT_MODAL_ID,
  payload,
});

export const setEventModalTitle = ({ payload }) => ({
  type: SET_EVENT_MODAL_TITLE,
  payload,
});

export const setNextMonth = () => ({
  type: SET_NEXT_MONTH,
});

export const setPrevMonth = () => ({
  type: SET_PREV_MONTH,
});

export const setNextYear = () => ({
  type: SET_NEXT_YEAR,
});

export const setPrevYear = () => ({
  type: SET_PREV_YEAR,
});

export const setCurrentMonth = () => ({
  type: SET_CURRENT_MONTH,
});

export const toggleEventModal = ({ payload }) => ({
  type: TOGGLE_EVENT_MODAL,
  payload,
});

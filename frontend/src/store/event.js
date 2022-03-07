import { csrfFetch } from "./csrf";

const LOAD = 'event/LOAD'
const LOAD_CATEGORIES = 'event/LOAD_CATEGORIES';
const ADD_ONE = 'event/ADD_ONE';

const load = list => ({
  type: LOAD,
  list
})

const loadCategories = categories => ({
  type: LOAD_CATEGORIES,
  categories
})

const addOneEvent = event => ({
  type: ADD_ONE,
  event
});

export const getAllEvents = () => async dispatch => {
  const response = await fetch('/api/event');
  if (response.ok) {
    const eventList = await response.json();
    dispatch(load(eventList));
  }
}

export const getEventCatogories = () => async dispatch => {
  const response = await fetch('/api/event/categories');

  if (response.ok) {
    const categories = await response.json();
    dispatch(loadCategories(categories));
  }
}

export const postEvent = (data) => async dispatch => {
  const response = await csrfFetch('/api/event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const event = await response.json();
    dispatch(addOneEvent(event));
    return event;
  }

}

const initialState = {
  categories: [],
}

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      const allEvents = {}
      action.eventList.forEach(event => {
        allEvents[event.id] = event;
      });
      return {
        ...allEvents,
        ...state,
        eventList: action.eventList
      }

    case LOAD_CATEGORIES:
      return {
        ...state,
        categories: action.categories
      }
    case ADD_ONE:
      const newState = {...state, [action.event.id]: action.event};

    default:
      return state;
  }
}

export default eventReducer;

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
  const response = await fetch('/api');
  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
}

export const getOneEvent = (id) => async dispatch => {
  console.log("eventid from reducer", id);
  const response = await fetch(`/api/event/${id}`);
  if (response.ok) {
    const event = await response.json();
    dispatch(addOneEvent(event));
  }
}

export const getEventCategories = () => async dispatch => {
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

export const editEvent = (data) => async dispatch => {
  const response = await csrfFetch('api/event', {
    method: "PUT",
    headers: { 'Content-Type': 'application/json'}
  })
}

const initialState = {
  list: [],
  categories: [],
}

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      const allEvents = {}
      action.list.forEach(event => {
        allEvents[event.id] = event;
      })
      return {
        ...allEvents,
        ...state,
        list: action.list
      }
    case LOAD_CATEGORIES:
      return {
        ...state,
        categories: action.categories
      }
    case ADD_ONE:
      const newState = {...state, [action.event.id]: action.event};
      const eventList = newState.list.map(event => newState[event.id]);
      eventList.push(action.event);
      newState.list = eventList
      return newState;
    default:
      return state;
  }
}

export default eventReducer;

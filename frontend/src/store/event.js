import { csrfFetch } from "./csrf";

const LOAD = 'event/LOAD'
const LOAD_CATEGORIES = 'event/LOAD_CATEGORIES';
const ADD_ONE = 'event/ADD_ONE';
const DELETE = 'event/DELETE'

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

const remove = id => ({
  type: DELETE,
  id
})

export const getAllEvents = () => async dispatch => {
  const response = await fetch('/api');
  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
}

export const getOneEvent = (id) => async dispatch => {
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
  const response = await csrfFetch(`/api/event/${data.id}`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });

  if (response.ok) {
    const event = await response.json();
    dispatch(addOneEvent(event));
    return event;
  }
}

export const deleteEvent = (id) => async dispatch => {
  const response = await csrfFetch(`/api/event/${id}`, {
    method: "DELETE",
  })

  if (response.ok) {
    const event = await response.json();
    dispatch(remove(id));
  }
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
    case DELETE:
      const events = {...state};
      delete events[action.id]; // TODO: Can delete successfully, but will show error message: Cannot read properties of undefined (reading 'id')
      // return everything as an array except the one we deleted
      // const filteredEvent = events.list.filter(event => (
      //   event.id !== action.id
      // ));
      //   console.log("filteredEvent", filteredEvent)

      // events.list = [...filteredEvent];
      return events;

      // case REMOVE_ITEM:
      //   return {
      //     ...state,
      //     [action.pokemonId]: {
      //       ...state[action.pokemonId],
      //       items: state[action.pokemonId].items.filter(
      //         (itemId) => itemId !== action.itemId
      //       )
      //   }
    default:
      return state;
  }
}

export default eventReducer;

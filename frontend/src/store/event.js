import { csrfFetch } from "./csrf";

const LOAD = 'event/LOAD'

const ADD_ONE = 'event/ADD_ONE';
const DELETE = 'event/DELETE'

const load = list => ({
  type: LOAD,
  list
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
  const response = await fetch(`/api/event/${id}/detail`);
  if (response.ok) {
    const event = await response.json();
    dispatch(addOneEvent(event));
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
  // list: [],
  // categories: [],
}

const eventReducer = (state = initialState, action) => {
  let newState;
  const allEvents = {}

  switch (action.type) {
    case LOAD:
      action.list.forEach(event => {
        allEvents[event.id] = event;
      })
      return {
        ...allEvents,
        ...state,
        // list: action.list
      }
    case ADD_ONE:
      newState = {...allEvents,...state, [action.event.id]: action.event};
      // const eventList = newState.list.map(event => newState[event.id]);
      // eventList.push(action.event);
      // newState.list = eventList
      console.log("newState in ADD_ONE", newState);
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
    default:
      return state;
  }
}

export default eventReducer;

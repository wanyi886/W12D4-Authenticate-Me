import { csrfFetch } from "./csrf";

const LOAD = 'ticket/LOAD';
const ADD_ONE = 'ticket/ADD_ONE';
const DELETE = 'ticket/DELETE';

const loadTickets = tickets => ({
  type: LOAD,
  tickets
})

const addOneTicket = ticket => ({
  type: ADD_ONE,
  ticket
})

const remove = id => ({
  type: DELETE,
  id
})

export const postTicket = data => async dispatch => {
  const response = await csrfFetch(`/api/tickets/event/${data.eventId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  });

  if(response.ok) {
    const ticket = await response.json();
    dispatch(addOneTicket(ticket));
  }

}

export const getTickets = (userId) => async dispatch => {
  const response = await fetch(`/api/tickets/users/${userId}`);

  if (response.ok) {
    const tickets = await response.json()
    dispatch(loadTickets(tickets));
    console.log("tickets from action creator", tickets)
    return tickets;
  }
}


export const deleteTicket = (id) => async dispatch => {
  const response = await csrfFetch(`/api/tickets/${id}`, {
    method: "DELETE",
  })

  if (response.ok) {
    const ticket = await response.json();
    dispatch(remove(id));
  }
}

const initialState = {}

const ticketReducer = (state = initialState, action) => {
  switch (action.type){
    case LOAD:
      return {
        ...state,
        list: action.tickets,
      }
    case ADD_ONE:
      const newState = {...state, [action.ticket.id]: action.ticket}
      // const ticketList = newState.list.map(ticket => newState)
      return newState;

    case DELETE:
      const tickets = {...state};
      delete tickets[action.id];

    default:
      return state;
  }
}

export default ticketReducer;

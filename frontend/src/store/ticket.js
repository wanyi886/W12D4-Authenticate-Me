const LOAD_TICKETS = 'event/LOAD_TICKETS';

const loadTickets = tickets => ({
  type: LOAD_TICKETS,
  tickets
})

export const getTickets = (id) => async dispatch => {
  const response = await fetch(`/api/tickets/users/${id}`);

  if (response.ok) {
    const tickets = await response.json()
    dispatch(loadTickets);
    return tickets;
  }
}

const initialState = {}

const ticketReducer = (state = initialState, action) => {
  switch (action.type){
    case LOAD_TICKETS:
      return {
        ...state,
        list: action.tickets
      }
    default:
      return state;
  }
}

export default ticketReducer;

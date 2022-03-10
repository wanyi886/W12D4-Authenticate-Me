const LOAD_TICKETS = 'event/LOAD_TICKETS';

const loadTickets = tickets => ({
  type: LOAD_TICKETS,
  tickets
})

export const getTickets = (userId) => async dispatch => {
  const response = await fetch(`/api/tickets/users/${userId}`);

  if (response.ok) {
    const tickets = await response.json()
    dispatch(loadTickets(tickets));
    console.log("tickets from action creator", tickets)
    return tickets;
  }
}

const initialState = {}

const ticketReducer = (state = initialState, action) => {
  switch (action.type){
    case LOAD_TICKETS:
      return {
        ...state,
        list: action.tickets,
      }
    default:
      return state;
  }
}

export default ticketReducer;

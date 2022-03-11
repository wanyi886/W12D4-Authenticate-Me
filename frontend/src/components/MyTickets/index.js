import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTickets } from '../../store/ticket'
import { Link } from "react-router-dom";
import { deleteTicket } from "../../store/ticket";

const MyTickets = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const tickets = useSelector(state => state.ticket.list)

  console.log(new Date().toDateString())

  useEffect(() => {
    dispatch(getTickets(sessionUser.id))
  }, [dispatch]);

  const handleCancelClick = (e, ticketId) => {
    e.preventDefault();
    dispatch(deleteTicket(ticketId));
  }

  let content;

  if (!tickets) {
    content = (
      <>
      <h1>My Tickets</h1>
        <div>
          You have no tickets now.
        </div>
      </>
    )
  } else {
    content = (
      <>
        <h1>My Tickets</h1>
          {tickets.map((ticket) => {
            return (
              <div className="ticket-body" key={ticket.id}>
                <div className="id">#{ticket.id}</div>
                <div className="title">{ticket.Event.title}</div>
                <div className="date">{new Date(ticket.Event.date).toDateString()}</div>
                <div>
                  <button onClick={(e)=> handleCancelClick(e, ticket.id)}>Cancel Registration</button>
                </div>
              </div>
            )
          })}
      </>
    )

  }

  return (
    <>
      {content}
    </>
  )
}

export default MyTickets;

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTickets } from '../../store/ticket'
import { Link } from "react-router-dom";
import { deleteTicket } from "../../store/ticket";
import { useHistory } from "react-router-dom";
import './MyTickets.css'

const MyTickets = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const tickets = useSelector(state => state.ticket.list)

  useEffect(() => {
    dispatch(getTickets(sessionUser.id))
  }, [dispatch]);

  const handleCancelClick = (e, ticketId) => {
    e.preventDefault();
    dispatch(deleteTicket(ticketId));
    dispatch(getTickets(sessionUser.id))
    // can we use history to redirect this page?
    history.push(`/tickets/users/${sessionUser.id}`)
  }

  let content;

  if (!tickets) {
    content = (
      <>
      <h1>My Tickets</h1>
        <div className="no-tickets">
          You have no tickets now.
        </div>
      </>
    )
  } else {
    content = (
      <div className="pagebody">
        <h1>My Tickets</h1>
        <div className="ticket-container">
          {tickets.map((ticket) => {
            return (
              <div className="ticket-body" key={ticket.id}>
                <div className="ima container img-body">
                  {/* <div className="id">#{ticket.id}</div> */}
                  <img src={`${ticket.Event.imgUrl}`}/>
                </div>
                <div className="date container">
                  {/* <div className="date">{new Date(ticket.Event.date).toDateString().split(" ")[0]}</div> */}
                  <div className="date">{new Date(ticket.Event.date).toDateString().split(" ")[1]}</div>
                  <div className="date">{new Date(ticket.Event.date).toDateString().split(" ")[2]}</div>
                  <div className="date">{new Date(ticket.Event.date).toDateString().split(" ")[3]}</div>
                </div>

                <div className="title container">
                    <h3 className="title">{ticket.Event.title}</h3>
                </div>

                <div className="btn container">
                  <button className="cancel-regi"onClick={(e)=> handleCancelClick(e, ticket.id)}>Cancel Registration</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )

  }

  return (
    <>
      {content}
    </>
  )
}

export default MyTickets;

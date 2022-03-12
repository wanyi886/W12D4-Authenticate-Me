import { useParams, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { deleteEvent, getAllEvents, getOneEvent } from "../../store/event";
import { postTicket } from "../../store/ticket";
import './EventDetail.css'
import EditEventFormPage from "../EditEventFormPage";
import EventsBrowser from "../EventsBrowser";

const EventDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();

  const event = useSelector(state => state.event[id]);
  const sessionUser = useSelector(state => state.session.user);


  const [ showEditForm, setShowEditForm ] = useState(false);


  useEffect(() => {
      // dispatch(getAllEvents());
      dispatch(getOneEvent(id));
  }, [dispatch]);

  const handleDeleteClick = (e) => {
    e.preventDefault();
    dispatch(deleteEvent(id));
    history.push('/')
  }

  const handleRegisterClick = (e) => {
    e.preventDefault();
    const payload = {
      eventId: event.id,
      userId: sessionUser.id
    }
    dispatch(postTicket(payload));


    history.push(`/tickets/users/${sessionUser.id}`);
    window.location.reload(false);

  }
  // const location = useLocation();

  const handleHomeClick = () => {
    history.push("/");

    // Not working:
    // return <EventsBrowser key={location.key} />
  }

  let content;

  if (!sessionUser) {
    content = content = (
      <div className="detail-page-body">
        <h1>{event?.title}</h1>
        <div className="detail-container">
          <div className="detail-body">
            <div  className="detail-header">
              <img src={event?.imgUrl} />
            </div>

            <div className="content subtitle">About this event</div>
            <div className="content des">{event && event.description}</div>
            <div className="content subtitle">Date and Time</div>
            <div className="content date">{new Date(event?.date).toDateString()}</div>
            <div className="content time">{`${event?.startTime} - ${event?.endTime}`}</div>
            <div className="content price">$ {event?.price} </div>
            <div className="content subtitle">Location</div>
            <div className="content address">{event?.address}</div>
            <div className="content city-state-zip">{event?.city}, {event?.state} {event?.zipCode}</div>
            <div className="content subtitle login-reminder">
              Please log in to register this event.
            </div>
          </div>
        </div>
    </div>
    )
  } else {

    if (event && showEditForm) {
      content = (
        <EditEventFormPage event={event} hideForm={() => setShowEditForm(false)}/>
      )
    } else {
      const ownEvent = sessionUser.id === event?.hostId;
      content = (
        <div className="detail-page-body">
          <h1>{event?.title}</h1>
          <div className="detail-container">
            <div className="detail-body">
            <div  className="detail-header">
              <img src={event?.imgUrl} />
            </div>
            <div className="detail-info">
              <div className="content subtitle">About this event</div>
              <div className="content des">{event && event.description}</div>
              <div className="content subtitle">Date and Time</div>
              <div className="content date">{new Date(event?.date).toDateString()}</div>
              <div className="content time">{`${event?.startTime} - ${event?.endTime}`}</div>
              <div className="content price">$ {event?.price} </div>
              <div className="content subtitle">Location</div>
              <div className="content address">{event?.address}</div>
              <div className="content city-state-zip">{event?.city}, {event?.state} {event?.zipCode}</div>
              <div>
                {event && ownEvent ? <button className='btn edit' type="button" onClick={() => setShowEditForm(true)}>Edit</button> : <button className='btn register' type="button" onClick={handleRegisterClick}>Register</button>}
                {event && ownEvent ? <button className='btn delete' type="button" onClick={handleDeleteClick}>Delete</button> : null}
              </div>
                  {/* <button onClick={() => history.push("/")}>Home</button> */}
                  <button onClick={handleHomeClick}>Home</button>
              </div>
            </div>
            </div>
      </div>
      )

  }

  }

  return (
    <div >
     {content}
    </div>
  )

}

export default EventDetail;

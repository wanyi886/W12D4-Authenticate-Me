import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { deleteEvent, getAllEvents, getOneEvent } from "../../store/event";
import './EventDetail.css'
import EditEventFormPage from "../EditEventFormPage";

const EventDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();

  const event = useSelector(state => state.event[id]);
  const sessionUser = useSelector(state => state.session.user);





  const [ showEditForm, setShowEditForm ] = useState(false);

  // const date = new Date(event?.date);

  useEffect(() => {
      // dispatch(getAllEvents());
      dispatch(getOneEvent(id));
  }, [dispatch]);

  const handleDeleteClick = (e) => {
    e.preventDefault();
    dispatch(deleteEvent(id));
    history.push('/')
  }

  let content = null;

  if (!sessionUser) {
    content = content = (
      <div className="detail-container">
        <h1>{event?.title}</h1>
        <div  className="detail-header">
          <img src={event?.imgUrl} />
        </div>
        <div className="detail-body">
          <div className="content subtitle">About this event</div>
          <div className="content des">{event && event.description}</div>
          <div className="content subtitle">Date and Time</div>
          <div className="content date">{event?.date}</div>
          <div className="content time">{`${event?.startTime} - ${event?.endTime}`}</div>
          <div className="content price">$ {event?.price} </div>
          <div className="content subtitle">Location</div>
          <div className="content address">{event?.address}</div>
          <div className="content city-state-zip">{event?.city}, {event?.state} {event?.zipCode}</div>
          <div>
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
        <div className="detail-container">
          <h1>{event?.title}</h1>
          <div  className="detail-header">
            <img src={event?.imgUrl} />
          </div>
          <div className="detail-body">
            <div className="content subtitle">About this event</div>
            <div className="content des">{event && event.description}</div>
            <div className="content subtitle">Date and Time</div>
            <div className="content date">{event?.date}</div>
            <div className="content time">{`${event?.startTime} - ${event?.endTime}`}</div>
            <div className="content price">$ {event?.price} </div>
            <div className="content subtitle">Location</div>
            <div className="content address">{event?.address}</div>
            <div className="content city-state-zip">{event?.city}, {event?.state} {event?.zipCode}</div>
            {/* <div>{event?.hostId}</div> */}
            <div>
              {/* <button type="button">Register</button> */}
              {event && ownEvent ? <button className='btn edit' type="button" onClick={() => setShowEditForm(true)}>Edit</button> : <button className='btn register' type="button">Register</button>}
              {event && ownEvent ? <button className='btn delete' type="button" onClick={handleDeleteClick}>Delete</button> : null}
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

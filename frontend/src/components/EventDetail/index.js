import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { getAllEvents, getOneEvent } from "../../store/event";
import './EventDetail.css'

const EventDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const event = useSelector(state => state.event[id]);
  const sessionUser = useSelector(state => state.session.user);
  const ownEvent = sessionUser.id === event?.hostId

  // const date = new Date(event?.date);

  useEffect(() => {

      // dispatch(getAllEvents());
      dispatch(getOneEvent(id));

  }, [dispatch])

  return (
    <div className="event-detail-container">
      <h2>{event?.title}</h2>
      <div  className="event-detail-img">
        <img src={event?.imgUrl} style={{width: "800px"}}/>
      </div>
      <div>About this event</div>
      <div>{event && event.description}</div>
      <div>Date and Time</div>
      <div>{event?.date}</div>
      <div>{`${event?.startTime} - ${event?.endTime}`}</div>
      <div>$ {event?.price} </div>
      <div>Location</div>
      <div>{event?.address}</div>
      <div>{event?.city}, {event?.state} {event?.zipCode}</div>
      <div>{event?.hostId}</div>
      <div>
        {/* <button type="button">Register</button> */}
         {event && ownEvent ? <button >Edit</button> : <button type="button">Register</button>}
         {event && ownEvent ? <button>Delete</button> : null}
      </div>
    </div>
  )

}

export default EventDetail;

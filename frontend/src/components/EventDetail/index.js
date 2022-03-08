import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { getAllEvents, getOneEvent } from "../../store/event";
import './EventDetail.css'

const EventDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  // const eventList = useSelector(state => state.event.list); // This is an empty array
  // console.log("eventList!!!!!!", eventList);

  console.log("eventID", id);
  // const event = eventList.find(event => event.id === Number(id));

  const event = useSelector(state => state.event[id]);

  const date = new Date(event?.date);
  console.log(date)

  console.log("event from useSelector in EventDetail", event);

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
      <div></div>
      <button type="button">Register</button>
    </div>
  )
}

export default EventDetail;

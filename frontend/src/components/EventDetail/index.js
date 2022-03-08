import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { getAllEvents, getOneEvent } from "../../store/event";

const EventDetail = () => {
  const dispatch = useDispatch();
  const eventId = useParams();
  const eventList = useSelector(state => state.event.list); // This is an empty array
  const event = eventList.find(event => event.id === Number(eventId));

  // const event = useSelector(state => state.event[eventId]) Not working

  // console.log("eventList!!!!!!", eventList);

  useEffect(() => {
    return async () => {
      // dispatch(getAllEvents()); Not working
      dispatch(getOneEvent(eventId));
    }
  }, [dispatch])

  return (
    <div>
      <h2>Event Detail Page</h2>
      <button type="submit">Register</button>
      {/* <ul>
        <li>{event.title}</li>
      </ul> */}
    </div>
  )
}

export default EventDetail;

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { getAllEvents, getOneEvent } from "../../store/event";

const EventDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const eventList = useSelector(state => state.event.list); // This is an empty array
  console.log("eventList!!!!!!", eventList);

  console.log("eventID", id);
  const event = eventList.find(event => event.id === Number(id));

  // const event = useSelector(state => state.event[eventId]) Not working

  console.log("event", event);

  useEffect(() => {

      dispatch(getAllEvents());
      dispatch(getOneEvent(id));

  }, [dispatch])

  return (
    <div>
      <h2>Event Detail Page</h2>
      <button type="submit">Register</button>
      <ul>
        {/* <li>{event.id}</li> */}
      </ul>
    </div>
  )
}

export default EventDetail;

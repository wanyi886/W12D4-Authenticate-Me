import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { getAllEvents, getOneEvent } from "../../store/event";

const EventDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  // const eventList = useSelector(state => state.event.list); // This is an empty array
  // console.log("eventList!!!!!!", eventList);

  console.log("eventID", id);
  // const event = eventList.find(event => event.id === Number(id));

  const event = useSelector(state => state.event[id]);

  console.log("event from useSelector in EventDetail", event);

  useEffect(() => {

      // dispatch(getAllEvents());
      dispatch(getOneEvent(id));

  }, [dispatch])

  return (
    <div>
      <h2>Event Detail Page</h2>
      <h2>{event?.title}</h2>
      <button type="submit">Register</button>
      <ul>
        <li>{event?.description}</li>
      </ul>
    </div>
  )
}

export default EventDetail;
